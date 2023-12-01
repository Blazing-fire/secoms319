import logo from './logo.svg';
import './App.css';

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const MainView = () => {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    axios.get('mongodb://localhost:27017/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Main View</h2>
      {movies.map(movie => (
        <div key={movie._id}>
          <a href={`/movie/${movie._id}`}>
            <h3>{movie.title}</h3>
          </a>
          <p>Rating: {movie.rating}</p>
          <p>Description: {movie.description}</p>
        </div>
      ))}
    </div>
  );
};

const MoviePage = ({ match }) => {
  const [movie, setMovie] = React.useState(null);
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:5000/movie/${match.params.id}`)
      .then(response => {
        setMovie(response.data);
        setReviews(response.data.reviews);
      })
      .catch(error => console.error(error));
  }, [match.params.id]);

  return (
    <div>
      <h2>Movie Page</h2>
      {movie && (
        <div>
          <h3>{movie.title}</h3>
          <p>Rating: {movie.rating}</p>
          <p>Description: {movie.description}</p>
        </div>
      )}
      <h3>Reviews</h3>
      {reviews.map(review => (
        <div key={review._id}>
          <p>{review.name} - {review.rating}</p>
          <p>{review.comment}</p>
          <a href={`/make-review/${match.params.id}/${review._id}`}>Add a Comment</a>
        </div>
      ))}
    </div>
  );
};

const MakeReviewPage = ({ match }) => {
  const [name, setName] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [comment, setComment] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = { name, rating, comment };

    axios.post(`http://localhost:5000/movie/${match.params.id}/review/${match.params.reviewId}`, newReview)
      .then(response => {
        // Handle success, maybe redirect to MoviePage
        console.log(response.data);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Make a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        <br />
        <label>Rating: </label>
        <input type="number" value={rating} onChange={e => setRating(e.target.value)} required />
        <br />
        <label>Comment: </label>
        <textarea value={comment} onChange={e => setComment(e.target.value)} required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainView} />
        <Route path="/movie/:id" component={MoviePage} />
        <Route path="/make-review/:id/:reviewId" component={MakeReviewPage} />
      </Switch>
    </Router>
  );
};

export default App;

