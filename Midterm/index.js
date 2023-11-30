fetch("./data.json")
.then(response => response.json())
.then(myMovies => loadMovies(myMovies));
var currentFileName = window.location.pathname.split('/').pop();

if (currentFileName === "index.html"){
    var imgMovie1 = document.getElementById("imgMovie1");  
    var imgMovie2 = document.getElementById("imgMovie2");  
    var imgMovie3 = document.getElementById("imgMovie3");  
    var imgMovie4 = document.getElementById("imgMovie4");  
}
if (currentFileName === "movies1.html"){
    var imgMovie5 = document.getElementById("imgMovie5"); 
    var imgMovie6 = document.getElementById("imgMovie6");  
    var imgMovie7 = document.getElementById("imgMovie7"); 
    var imgMovie8 = document.getElementById("imgMovie8"); 
}
if (currentFileName === "movies2.html"){
    var imgMovie9 = document.getElementById("imgMovie9");  
    var imgMovie10 = document.getElementById("imgMovie10"); 
    var imgMovie11 = document.getElementById("imgMovie11");  
    var imgMovie12 = document.getElementById("imgMovie12");  
}
if (currentFileName === "index.html"){
    var txtMovie1 = document.getElementById("txtMovie1"); 
    var txtMovie2 = document.getElementById("txtMovie2"); 
    var txtMovie3 = document.getElementById("txtMovie3"); 
    var txtMovie4 = document.getElementById("txtMovie4"); 
}
if (currentFileName === "movies1.html"){
    var txtMovie5 = document.getElementById("txtMovie5"); 
    var txtMovie6 = document.getElementById("txtMovie6");  
    var txtMovie7 = document.getElementById("txtMovie7"); 
    var txtMovie8 = document.getElementById("txtMovie8"); 
}
if (currentFileName === "movies2.html"){
    var txtMovie9 = document.getElementById("txtMovie9"); 
    var txtMovie10 = document.getElementById("txtMovie10"); 
    var txtMovie11 = document.getElementById("txtMovie11"); 
    var txtMovie12 = document.getElementById("txtMovie12");
}

function loadMovies(myMovies) {
for (var i = 0; i < myMovies.movies.length; i++) {
  let title = myMovies.movies[i].title;
  let year = myMovies.movies[i].year;
  let url = myMovies.movies[i].url;
  let rating = myMovies.movies[i].rating;
  let description = myMovies.movies[i].description;

  let imgMovie = document.createElement("div");
  imgMovie.innerHTML = `<img src="${url}" class="card-img-top" alt="...">`;

  let txtMovie = document.createElement("p");
  txtMovie.innerHTML = `<p class="card-text"><strong> ${title}</strong> <br> <strong>Year Released:</strong> ${year} <br> <strong>Rating:</strong> ${rating}/5 <br> <strong>Description:</strong> ${description}</p>`;
  if (currentFileName === "index.html"){
  if (title === "Iron Man") {
    document.getElementById("imgMovie1").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie1").appendChild(txtMovie);
  } else if (title === "Avengers") {
    document.getElementById("imgMovie2").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie2").appendChild(txtMovie);
  } else if (title === "Captin America: The First Avenger") {
    document.getElementById("imgMovie3").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie3").appendChild(txtMovie);
  } else if (title === "X-Men") {
    document.getElementById("imgMovie4").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie4").appendChild(txtMovie);
  }
 }
 if (currentFileName === "movies1.html"){
    if (title === "The Lego Movie") {
    document.getElementById("imgMovie5").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie5").appendChild(txtMovie);
  } else if (title === "The Incredibles") {
    document.getElementById("imgMovie6").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie6").appendChild(txtMovie);
  } else if (title === "The Lion King") {
    document.getElementById("imgMovie7").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie7").appendChild(txtMovie);
  } else if (title === "The Boss Baby") {
    document.getElementById("imgMovie8").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie8").appendChild(txtMovie);
  }
 }
    if (currentFileName === "movies2.html"){
    if (title === "The Dark Knight") {
    document.getElementById("imgMovie9").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie9").appendChild(txtMovie);
  } else if (title === "Batman v Superman") {
    document.getElementById("imgMovie10").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie10").appendChild(txtMovie);
  } else if (title === "Green Lantern") {
    document.getElementById("imgMovie11").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie11").appendChild(txtMovie);
  } else if (title === "Man of Steel") {
    document.getElementById("imgMovie12").appendChild(imgMovie.firstChild);
    document.getElementById("txtMovie12").appendChild(txtMovie);
  }
}
}
}