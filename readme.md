# Assignment 2 - Web API.

Name: Ziqi Zhou

## Features.

 + Feature 1 - Custom API Documentations with Swagger
 + Feature 2 - Add many mongoose models to load data locally and  in the cloud mongodb.
 + Feature 3 -  new API routes, including a parameterised URL.
 + Feature 4 - Mongo integration
 + Feature 5 - Minimal React integration(GET and POST data to API)
 + Feature 6 - Nested Document and/or object referencing in Mongo/Mongoose.
 + Feature 7 - Basic Authentication
 + Feature 8 - Good use of express middleware ( Error handling).

## Installation Requirements

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/shitanshiwoerzi/Assignments2.git
```

followed by installation

```bat
git install swagger-ui express
git install swagger-jsdocs
```

## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=mongodb+srv://Zhou:<password>@test.5cr3l.mongodb.net/test?retryWrites=true&w=majority
SEED_DB=true
secret=<JWTtoken>
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

| Path                             | GET                              | POST                            | PUT           | DELETE                                |
| -------------------------------- | :------------------------------- | ------------------------------- | ------------- | ------------------------------------- |
| /api/movies                      | Get a list of movies             | N/A                             | N/A           | N/A                                   |
| /api/movies/{movieid}            | Get a specific movie             | Update something of a movie     | N/A           | Delete the specific movie             |
| /api/movies/{movieid}/reviews    | Get all reviews for movie        | Create a new review for Movie   | N/A           | Delete all reviews for movie          |
| /api/nowplaying                  | Get a list of now-playing movie  | N/A                             | N/A           | N/A                                   |
| /api/nowplaying/{nowplayingid}   | Get a specific now-playing movie | Update a specific movie         | N/A           | Delete the specific now-playing movie |
| /api/upcoming                    | Get a list of upcoming movies    | N/A                             | N/A           | N/A                                   |
| /api/upcoming/{upcomingid}       | Get a specific upcoming movie    | Update a specific movie         | N/A           | Delete the specific upcoming movie    |
| /api/toprated                    | Get a list of top-rated movies   | N/A                             | N/A           | N/A                                   |
| /api/toprated/{topratedid}       | Get a specific top-rated movie   | Update a specific movie         | N/A           | Delete the specific top-rated movie   |
| /api/users                       | Get a list of users              | Register or authenticate a user | N/A           | N/A                                   |
| /api/users/{userid}              | N/A                              | N/A                             | Update a user | N/A                                   |
| /api/users/{username}/favourites | Get Movie Favourites             | Add a favourite                 | N/A           | N/A                                   |
| /api/actors                      | Get a list of actors             | N/A                             | N/A           | N/A                                   |
| /api/actors/{actorid}            | Get details of one actor         | N/A                             | N/A           | N/A                                   |
If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

http://localhost:8080/api-docs/ (with Swagger ui)


## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.

~~~javascript
import passport from 'passport';
import passportJWT from 'passport-jwt';
import UserModel from './../api/users/userModel';
import dotenv from 'dotenv';

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;
const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
  const user = await UserModel.findByUserName(payload);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

export default passport;
~~~

~~~javascript
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
~~~

Protected Router

~~~javascript
<PrivateRoute path="/movies" component={Movies} />
~~~

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

~~~Javascript
export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getMovies = () => {
    return fetch(
       '/api/movies',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };
export const getNowplaying = () =>{
    return fetch(
        '/api/nowplaying',{headers: {
            'Content-Type': 'application/json'
     }
   }
   ).then(res => res.json());
};

export const getUpcoming = () =>{
    return fetch(
        '/api/upcoming',{headers: {
            'Content-Type': 'application/json'
     }
   }
   ).then(res => res.json());
};

export const getToprated = () =>{
    return fetch(
        '/api/toprated',{headers: {
            'Content-Type': 'application/json'
     }
   }
   ).then(res => res.json());
};

export const getPeople = () => {
    return fetch(
        '/api/actor',{ headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

~~~

## Independent learning.

Swagger-jsdoc (automatically generating Swagger Documentation for the Node API) .



# Assignment 2 - Agile Software Practice.

Name: Ziqi Zhou

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Put /api/movies/:id - update a specific movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.
+ Post /api/movies - add a new movie to the database.
+ Get /api/movies/:id/reviews - returns a review of a specific movie.
+ Post /api/movies/:id/reviews - add a new review to the specific movie.
+ Delete /api/movies/:id - delete a specific movie.
+ Get /api/actors - returns an array of actor objects.
+ Get /api/upcoming - returns an array of upcoming movie objects.
+ Get /api/nowplaying - returns an array of now-playing movie objects.
+ Get /api/toprated - returns an array of top-rated objects.
+ Get /api/users - returns an array of user objects.
+ Post /api/users - add a new user to the database.
+ Put /api/users/:id - update a specific user.
+ Get /api/:userName/favourites - returns detailed information of favourite movies.
+ Post /api/users/:userName/favourites - add a specific movie to favourite.

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Post /api/movies - test when the new movie has no title, invalid release date, empty genre list. Test adding a movie without prior authentication. See tests/functional/api/movies/index.js 
+ Get /api/movies - test  movies list when the token is valid and invalid(when unauthorized).
+ Get /api/movies/:id - test a specific movie when the id is valid and invalid.
+ Get /api/users - test users list
+ Post /api/users - test registering a new user
+ Delete /api/movies/:id - test delete operation when the id is valid.

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://assignments2.herokuapp.com/ - Staging deployment
+ https://assignments2-master.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

  ![][productionapp]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.

[stagingapp]: ./img/stagingapp.png
[productionapp]: ./img/productionapp.png



