import express from 'express';
import db from '../../../models';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send({
      session: req.session,
      user: req.user,
      authenticated: req.isAuthenticated()
    })
  });

export default router;