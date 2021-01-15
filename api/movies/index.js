import express from 'express';
import movieModel from './movieModel';

const router = express.Router();

router.get('/', (req, res, next)=> {
  movieModel.find().then(movies => res.status(200).send(movies))
  .catch(next);
});

router.get('/:id', async (req, res, next)=>{
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if(movie){
  movieModel.findByMovieDBId(id).then(movie =>res.status(200).send(movie))
  .catch(next);
  }else{
    res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
  }
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  movieModel.findByMovieDBId(id)
  .then(movie => res.status(201).json(movie.reviews))
  .catch((error) => next(error));
});

router.post('/:id/reviews', async (req, res, next) => {
  try{
    const id = parseInt(req.params.id);
    const newReview = req.body.reviews;
    const movie = await movieModel.findByMovieDBId(id);
    if(movie.reviews.indexOf(newReview) === -1){
    await movie.reviews.push(newReview);
    }else{
      res.status(403).send("The review already exists");
    }
    await movie.save(); 
    res.status(201).json(movie);
  }catch(error){
    next(error);
  }
})

router.delete('/:id', async (req,res, next)=>{
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if(movie){
  movieModel.deleteOne({id: id}).then(res.status(200).send("delete successfully"))
  .catch(next);
  } else{
    res.status(404).send("can't find the moive to delete");
  }
});

export default router;