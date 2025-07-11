// minimaza errores 
let editingMovieId = null;

document.addEventListener("DOMContentLoaded", () => {
    printMovie();
});

// METODO GET funcion para cargar la speliculas de la base de datos
async function getAllmovies() {
    const response = await fetch("http://localhost:3000/movies", {
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
       <p>${movie.genre}</p>
       <p>${movie.synopsis}</p>
        <button onclick="deleteMovie('${movie.id}')">Eliminar</button>
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
    const director = document.getElementById("director").value;
    const year = document.getElementById("year").value;
    const country = document.getElementById("country").value;
    const genre = document.getElementById("genre").value;
    const synopsis = document.getElementById("synopsis").value;

    const movienew = {
        title,
        director,
        year,
        country,
        genre,
        synopsis,

    };

    const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movienew)
    });

    console.log("Código de estado", response.status)
    if (response.ok) {
        const data = await response.json()
        console.log("pelicula creada", data)
        await printMovie();
    } else {
        const error = await response.text()
        console.log('error al cargar pelicula', error);
    }


}

// Escuchar el envío del formulario
const form = document.getElementById("movieForm");
form.addEventListener("submit", addMovie);

//Método put
async function getMovieById(id) {

    const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {

          const movie = await response.json();

        const title = document.getElementById("title").value = movie.title;
        const director = document.getElementById("director").value = movie.director;
        const year = document.getElementById("year").value = movie.year;
        const country = document.getElementById("country").value = movie.country;
        const genre = document.getElementById("genre").value = movie.genre;
        const synopsis = document.getElementById("synopsis"). value = movie.synopsis;
        editingMovieId = movie.id

           }else{
        console.log("error")
    }

}

async function updateMovie(event){
    event.preventDefault()

     if(!editingMovieId){
        console.log("no hay pelicula selecciona para actualizar")
        return;
    }

        const title = document.getElementById("title").value;
        const director = document.getElementById("director").value ;
        const year = document.getElementById("year").value;
        const country = document.getElementById("country").value;
        const genre = document.getElementById("genre").value;
        const synopsis = document.getElementById("synopsis"). value;

        const updateMovie = {
        title,
        director,
        year,
        country,
        genre,
        synopsis,

    };

       const response = await fetch(`http://localhost:3000/movies/${editingMovieId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(updateMovie)
    });

    if(response.ok){

        console.log("Pelicula bien actualizada")
        document.getElementById("movieForm").reset()
        editingMovieId = null
        await printMovie()
    }else{
        console.log("error")
    }
}

const updateButton = document.getElementById("updateButton")
updateButton.addEventListener('click', updateMovie)