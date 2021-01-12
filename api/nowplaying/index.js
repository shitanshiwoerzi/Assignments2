import express from 'express';
import nowplayingModel from './nowplayingModel';

const router = express.Router();

router.get('/',(req, res, next)=>{
    nowplayingModel.find().then(movies => res.status(200).send(movies))
    .catch(next);
  });

  export default router;