const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { v4: uuidv4} = require('uuid');

app.use(cors());
app.use(express.json());

let movies = [
    { id: uuidv4(), title: 'The Godfather', year: 1972, director: 'Francis Ford Coppola', genre: 'Crime, Drama' },
    { id: uuidv4(), title: 'The Shawshank Redemption', year: 1994, director: 'Frank Darabont', genre: 'Drama' },
    { id: uuidv4(), title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', genre: 'Action, Crime, Drama' },
];

//Get all movies
app.get('/movies', (req, res) =>{
    res.json(movies);
});

//Get movie by id
app.get('/movies/:id', (req, res) => {
    const id = (req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send(`Movie not found, the id ${id} not exist`);
    }
});

//Create a new movie with all params
app.post('/movies', (req, res) => {
    const movie = req.body;
    if(!movie.title || !movie.director || !movie.genre || !movie.year){
        return res.status(400).json({error: 'Missing requiered fiels' });
    }
    movie.id = uuidv4();
    movies.push(movie);
    res.json(movie);
});

//Edit title and director of a movie
app.put('/movies/:id', (req, res) => {
    const id = (req.params.id);
    const {title, director} = req.body;
    const movie = movies.find(movie => movie.id === id);
    if (!movie){
        res.status(404).send('This id not exist');
    }
     movie.title = title;
     movie.director = director;
     res.json(movie);
});


//Delete movie by id
app.delete('/movies/:id', (req, res) => {
    const id = (req.params.id);
    const movie = movies.findIndex(movie => movie.id === id);
    if(movie !== -1){
        movies.splice(movie, 1);
        res.send(`Se borró la pelicula con el id: ${id}`);
    } else {
        res.status(404).send(`No se ha encontrado la pelicula con el id: ${id}`)
    }
    
});

const PORT = 3001;
app.listen(PORT, ()=>{
    console.info(`🚀 Server running on port ${PORT}`);
});