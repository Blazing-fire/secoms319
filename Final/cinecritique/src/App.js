import logo from './logo.svg';
import './App.css';

// Import other necessary modules
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MongoClient, ObjectId } from 'mongodb';
import React, { useEffect, useState } from 'react'; // Import React and necessary hooks

// MongoDB connection details
const url = 'mongodb://localhost:27017';
const dbName = 'reactdata';
const client = new MongoClient(url);

// MainView component
const MainView = () => {
  const [movies, setMovies] = useState([]); // Use the useState hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const moviesCollection = db.collection('Movies');

        const result = await moviesCollection.find().limit(100).toArray();
        setMovies(result);
      } catch (error) {
        console.error(error);
      } finally {
        await client.close();
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-view">
      <h2>Main View</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie._id} className="movie-item">
            <img src={movie.url} alt={`Poster for ${movie.title}`} />
            <div className="movie-details">
              <h3>{movie.title}, {movie.year}</h3>
              <p>Rating: {movie.rating}</p>
              <p>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// MoviePage component
const MoviePage = ({ match }) => {
  const [movie, setMovie] = React.useState(null);
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const moviesCollection = db.collection('Movies');

        const result = await moviesCollection.findOne({ _id: new ObjectId(match.params.id) });
        setMovie(result);
        setReviews(result.reviews || []);
      } catch (error) {
        console.error(error);
      } finally {
        await client.close();
      }
    };

    fetchData();
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

// MakeReviewPage component
const MakeReviewPage = ({ match }) => {
  const [name, setName] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [comment, setComment] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await client.connect();
      const db = client.db(dbName);
      const moviesCollection = db.collection('Movies');

      const newReview = { name, rating, comment };
      const result = await moviesCollection.updateOne(
        { _id: new ObjectId(match.params.id), 'reviews._id': new ObjectId(match.params.reviewId) },
        { $push: { 'reviews.$.comments': newReview } }
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
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

