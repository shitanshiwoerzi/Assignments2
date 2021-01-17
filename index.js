import dotenv, { load } from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import movieModel from './api/movies/movieModel'
import bodyParser from 'body-parser';
import './db';
import {loadUsers, loadMovies, loadActors, loadNowplaying, loadUpcoming, loadToprated} from './seedData';
import usersRouter from './api/users';
import actorsRouter from './api/actors';
import upcomingRouter from './api/upcoming';
import nowplayingRouter from './api/nowplaying';
import topratedRouter from './api/toprated';
import passport from './authenticate';
import session from 'express-session';

dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
  loadActors();
  loadNowplaying();
  loadUpcoming();
  loadToprated();
}
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Movie Api',
      description: 'Movie API Information',
      contact: {
        name: 'Amazing Developer'
      },
      servers: ['http://localhost:8080']
    }
  },
  apis:['index.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use(passport.initialize());

app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use('/api/upcoming', upcomingRouter);
app.use('/api/nowplaying', nowplayingRouter);
app.use('/api/toprated', topratedRouter);
app.use('/api/users', usersRouter);
app.use('/api/actor', actorsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(errHandler);

/**
 * @swagger
 * /movies:
 *  get:
 *      description: Use to request all movies
 *      responses:
 *          '200':
 *            description: A successful request
 */

 app.get('/movies',(req,res)=> {
   movieModel.find().then(movies => res.status(200).send(movies))
 });

 /**
  * @swagger
  * /movies/{Id}:
  * get:
  *     descripition: Use to request a movie
  *     parameters:
  *     - name: "Id"
  *       in: 'path'
  *       descripition: 'ID of movie of return'
  *       required: true
  *       type: 'integer'
  *     responses:
  *         '200':
  *           description: A successful request
  */
app.get('/movies/{Id}', (req,res)=>{
  movieModel.findByMovieDBId(id).then(movie =>res.status(200).send(movie));
});

 /**
 * @swagger
 * /movie:
 *  put:
 *      description: Use to update a movie
 *      responses:
 *          '201':
 *            description: A successful response
 */

app.put('/movie',(req,res)=> {
  res.status(200).send('Successfully updated movie');
});

const server = app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

module.exports = server;