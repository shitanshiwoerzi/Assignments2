import express from 'express';
import { nowplaying } from '../../seedData/nowplaying';
import nowplayingModel from './nowplayingModel';

const router = express.Router();

router.get('/',(req, res, next)=>{
    nowplayingModel.find().then(movies => res.status(200).send(movies))
    .catch(next);
  });

router.get('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const movie = await nowplayingModel.findByMovieDBId(id);
    if(movie){
    nowplayingModel.findByMovieDBId(id).then(nowplaying =>res.status(200).send(nowplaying))
    .catch(next);
    }else{
      res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
    }
  });  
  
router.post('/:id', async (req, res, next)=>{
    const id = parseInt(req.params.id);
    const movie = await nowplayingModel.findByMovieDBId(id);
    if(movie){
      nowplayingModel.updateOne({id: id}, req.body).then(res.status(200).send({message: `Update the content of the movie with id : ${id}`, status: 200}))
      .catch(next);
      }else{
        res.status(404).send({message: `Unable to find movie with id: ${id}.`, status: 404});
      }
  });
  
router.delete('/:id', async (req,res, next)=>{
    const id = parseInt(req.params.id);
    const movie = await nowplayingModel.findByMovieDBId(id);
    if(movie){
    nowplayingModel.deleteOne({id: id}).then(res.status(200).send("delete successfully"))
    .catch(next);
    } else{
      res.status(404).send("can't find the moive to delete");
    }
  });

  export default router;