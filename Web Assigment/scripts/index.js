// form validation

function validateform() {
    var first_name = document.myform.first_name.value;
    var last_name = document.myform.last_name.value;
    var email = document.myform.email.value;
    var comments = document.myform.comments.value;

    if (!first_name || !last_name || !email || !comments) {
        alert("Please fill in all the required fields.");
        return false;
    }

    return true;
}


// search movie 

function searchMovies() {
    const searchTerm = document.getElementById('movieSearch').value;

    if (!searchTerm) {
        alert('Please enter a movie title.');
        return;
    }
    const apiUrl = `http://api.tvmaze.com/search/shows?q=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayMovies(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// display movie

function displayMovies(movies) {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('grid-item');
        const imageUrl = movie.show.image ? movie.show.image.medium : 'path/to/placeholder-image.jpg';

        movieDiv.innerHTML = `
            <img src="${imageUrl}" alt="${movie.show.name}">
            <h3>${movie.show.name}</h3>
            <p>${movie.show.summary || 'No summary available.'}</p>
            <button onclick="addToGrid('${movie.show.name}')">Add to Grid</button>
        `;
        gridContainer.appendChild(movieDiv);
    });
}

// delete grid 
function deleteMovie(movieId) {
    const gridItem = document.getElementById(movieId);
    if (gridItem) {
        gridItem.remove();
    }
}

// ad grid   

function addToGrid(movieTitle) {
    const gridContainer = document.getElementById('gridContainer');

    const movieId = `movie${gridContainer.children.length + 1}`;

    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.id = movieId;
    gridItem.innerHTML = `
        <img src="../images/Rectangle 4.png" alt="${movieTitle}">
        <h3>${movieTitle}</h3>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut…</p>
        <button class="delete-button" onclick="deleteMovie('${movieId}')">Delete</button>
    `;

    gridContainer.appendChild(gridItem);
}


// static item 
const staticItem = document.getElementById('staticItem');
let currentIndex = 0;

function moveStaticItems() {
    const items = staticItem.getElementsByClassName('static-img');
    const currentItem = items[currentIndex];

    if (currentItem) {
        currentItem.style.animation = 'moveItem 3s linear';
        currentIndex++;
    } else {
        alert('No more items to move.');
    }
}
function checkLocation() {
    const location = document.getElementById('locationInput').value;

    alert(`Checking location: ${location}`);
}
