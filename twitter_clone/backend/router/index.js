import express from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const Status = mongoose.model('Status');

export default function (router) {
  router.get('/api/users', async (req, res) => {
    const r = new RegExp(`${req.query.q}`, 'i');
    res.json(
      await User.find({
        $or: [{ username: r }, { nickname: r }],
      }).select('-password'),
    );
  });

  router.get('/api/user/me', async (req, res) => {
    res.json(await User.findById(req.session.uid).select('-password'));
  });

  router.put('/api/user/me', async (req, res) => {
    await User.findByIdAndUpdate(req.session.uid, req.body);
    res.sendStatus(200);
  });

  router.get('/api/user/logout', async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });

  router.post('/api/user/login', async (req, res) => {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser || !(await bcrypt.compare(req.body.password, foundUser.password))) {
      throw {
        message: 'Username or password incorrect',
        status: 401,
      };
    }
    req.session.uid = foundUser._id;
    res.sendStatus(200);
  });

  router.post('/api/user/register', async (req, res) => {
    
    if (await User.findOne({ username: req.body.username })) {
      throw {
        message: 'User already exist',
      };
    }
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });
   
    await user.save();
    req.session.uid = user._id;
    res.sendStatus(200);
  });

  router.get('/api/user/:id', async (req, res) => {
    res.json(await User.findById(req.params.id).select('-password'));
  });

  router.get('/api/status', async (req, res) => {
    res.json(
      await Status.find(req.query.uid ? { created_by: req.query.uid } : {})
        .populate('created_by')
        .sort('-created_at'),
    );
  });

  router.post('/api/status', async (req, res) => {
    const s = new Status({
      ...req.body,
      created_by: req.session.uid,
    });
    await s.save();
    res.json(s);
  });

  router.put('/api/status/:id', async (req, res) => {
    await Status.updateOne(
      {
        _id: req.params.id,
        created_by: req.session.uid,
      },
      {
        $set: {
          ...req.body,
        },
      },
    );
    res.sendStatus(200);
  });

  router.delete('/api/status/:id', async (req, res) => {
    await Status.deleteOne({
      _id: req.params.id,
      created_by: req.session.uid,
    });
    res.sendStatus(200);
  });
}
