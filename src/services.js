let editingBookId = null;

document.addEventListener("DOMContentLoaded", () => {
    printBook();
});

// METODO GET funcion para cargar la speliculas de la base de datos
async function getAllmovies() {
    const response = await fetch("http://localhost:3000/movies",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    
    
    const movieData = await response.json()
    console.log(movieData)
    return movieData
}


//PRINT
let moviesContainer = document.querySelector("section")
async function printMovie(params) {
    console.log("hola")
    let movies = await getAllmovies();
    moviesContainer.innerHTML = ""
    const movieList = movies.map(movie => {
        return moviesContainer.innerHTML += `<h1>${movie.title}</h1>
       <p>${movie.director}</p>
       <p>${movie.year}</p>
       <p>${movie.country}</p>
       <p>${movie.gender}</p>

        <button onclick="deleteMovie('${movie.id}')">Elimiar</button>
        <button onclick="getMovieById('${movie.id}')">Editar</button> `
    });
    return movieList
}
/// metodo detele
async function deleteMovie(id) {
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        await printMovie();
    }
    else {
        console.log(`Error a cargar pelicula`)
    }
}

// metodo post
async function addMovie(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const director = document.getElementById("ditector").value;
    const year = document.getElementById("year").value;
