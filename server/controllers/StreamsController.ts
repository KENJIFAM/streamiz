import express from 'express';
import db from '../models';

const router = express.Router();

/*****  GET ALL streams from database *****/
router.get('/streams', async (req, res) => {
  try {
    const streams = await db.Stream.find({}).sort({ createdAt: 'desc' });
    return res.status(200).json(streams);
  } catch (err) {
    return res.status(500).send('There was a problem finding streams.');
  }
});

/***** GET stream by id *****/
router.get('/streams/:id', async (req, res) => {
  try {
    const stream = await db.Stream.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } }, { new: true });
    return res.status(200).json(stream);
  } catch (err) {
    return res.status(500).send('This stream is not valid!');
  }
});

/***** POST stream *****/
router.post('/streams', async (req, res) => {
  try {
    const stream = await db.Stream.create(req.body);
    return res.status(200).json(stream);
  } catch (err) {
    return res.status(500).send('Cannot create stream!');
  }
});

/***** PATCH stream by id *****/
router.patch('/streams/:id', async (req, res) => {
  try {
    const stream = await db.Stream.findOneAndUpdate(
      {_id: req.params.id},
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(stream);
  } catch (err) {
    return res.status(500).send('This stream does not exist!');
  }
});

/***** DELETE stream by id *****/
router.delete('/streams/:id', async (req, res) => {
  try {
    const stream = await db.Stream.findOne({_id: req.params.id});
    await stream.remove();
    return res.status(200).json(stream);
  } catch (err) {
    return res.status(500).send('This stream does not exist!');
  }
});

export default router;
