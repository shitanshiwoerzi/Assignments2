import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import actorModel from '../api/actors/actorModel';
import nowplayingModel from '../api/nowplaying/nowplayingModel';
import topratedModel from '../api/toprated/topratedModel';
import upcomingModel from '../api/upcoming/upcomingModel';
import {movies} from './movies.js';
import {actors} from './actors.js';
import {nowplaying} from './nowplaying.js';
import {toprated} from './toprated.js';
import {upcoming} from './upcoming.js';


const users = [
  {
    'username': 'user1',
    'password': 'test1',
  }
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }

  // deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed movie data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}


  // deletes all actors documents in collection and inserts test data
  export async function loadActors() {
    console.log('load seed actor data');
    console.log(actors.length);
    try {
      await actorModel.deleteMany();
      await actorModel.collection.insertMany(actors);
      console.info(`${actors.length} actors were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load actor Data: ${err}`);
    }
  }

  // deletes all nowplaying documents in collection and inserts test data
  export async function loadNowplaying() {
    console.log('load seed nowplaying data');
    console.log(nowplaying.length);
    try {
      await nowplayingModel.deleteMany();
      await nowplayingModel.collection.insertMany(nowplaying);
      console.info(`${nowplaying.length} nowplaying were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load nowplaying Data: ${err}`);
    }
  }

  export async function loadToprated() {
    console.log('load seed toprated data');
    console.log(toprated.length);
    try {
      await topratedModel.deleteMany();
      await topratedModel.collection.insertMany(toprated);
      console.info(`${toprated.length} toprated were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load toprated Data: ${err}`);
    }
  }

  export async function loadUpcoming() {
    console.log('load seed upcoming data');
    console.log(upcoming.length);
    try {
      await upcomingModel.deleteMany();
      await upcomingModel.collection.insertMany(upcoming);
      console.info(`${upcoming.length} upcoming were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load upcoming Data: ${err}`);
    }
  }