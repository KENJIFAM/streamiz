import express from 'express';
import db from '../models';

const router = express.Router();

/*****  SIGN IN *****/
router.post('/auth', async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(500).send('Signin failed!');
    }
    const user = await db.User.findOneAndUpdate(
      { userId: req.body.userId },
      { $set: req.body },
      { new: true, upsert: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send('Signin failed!');
  }
});

/*****  GET ALL streams from database *****/
router.get('/streams', async (req, res) => {
  try {
    const streams = await db.Stream.find({})
      .sort({ createdAt: 'desc' })
      .populate('user', 'userId name avatar -_id');
    return res.status(200).json(streams);
  } catch (err) {
    return res.status(500).send('There was a problem finding streams.');
  }
});

/***** GET stream by id *****/
router.get('/streams/:id', async (req, res) => {
  try {
    const stream = await db.Stream
      .findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { views: 1 } },
        { new: true }
      ).populate('user', 'userId name avatar -_id');
    return res.status(200).json(stream);
  } catch (err) {
    return res.status(500).send('This stream is not valid!');
  }
});

/***** POST stream *****/
router.post('/streams', async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.body.user);
    if (foundUser) {
      const stream = await db.Stream.create(req.body);
      foundUser.streams.push(stream.id);
      await foundUser.save();
      const foundStream = await db.Stream.findById(stream.id)
        .populate('user', 'userId name avatar -_id');
      return res.status(200).json(foundStream);
    }
    return res.status(500).send('User not found!');
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
    ).populate('user', 'userId name avatar -_id');
    return res.status(200).json(stream);
  } catch (err) {
    return res.status(500).send('This stream does not exist!');
  }
});

/***** DELETE stream by id *****/
router.delete('/streams/:id', async (req, res) => {
  try {
    const stream = await db.Stream.findById(req.params.id);
    if (stream) {
      await stream.remove();
      return res.status(200).json(stream);
    }
    return res.status(500).send('This stream does not exist!');
  } catch (err) {
    return res.status(500).send('Error!');
  }
});

export default router;
