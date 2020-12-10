const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//para crear un servidor express
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; //se debe crear el ambiente ATLAS_URI, para ello se crea el archivo .env
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

//vamos a agregar la info de las rutas
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//si alguien pone por ejemplo /users, va a cargar todo lo de usersRouter 
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});