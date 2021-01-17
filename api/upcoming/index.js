import express from 'express';
import upcomingModel from './upcomingModel';

const router = express.Router();

router.get('/',(req, res, next)=>{
    upcomingModel.find()
    .then(movies => res.status(200).send(movies))
    .catch(next);
  });

router.get('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const movie = await upcomingModel.findByMovieDBId(id);
    if(movie){
    upcomingModel.findByMovieDBId(id).then(upcoming =>res.status(200).send(upcoming))
    .catch(next);
    }else{
      res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
    }
  });  
  
router.post('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const movie = await upcomingModel.findByMovieDBId(id);
    if(movie){
      upcomingModel.updateOne({id: id}, req.body).then(res.status(200).send({message: `Update the content of the movie with id : ${id}`, status: 200}))
      .catch(next);
      }else{
        res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
      }
  });
  
router.delete('/:id', async (req,res, next)=>{
    const id = parseInt(req.params.id);
    const movie = await upcomingModel.findByMovieDBId(id);
    if(movie){
    upcomingModel.deleteOne({id: id}).then(res.status(200).send("delete successfully"))
    .catch(next);
    } else{
      res.status(404).send("can't find the moive to delete");
    }
  });
  export default router;