const express = require('express');
const apiRouter = express.Router();
const imagesRouter = require('./imageRouter');
const usersRouter = require('./userRouter');
const authRouter = require('./authRouter');
apiRouter.use('/images',imagesRouter);
apiRouter.use('/users',usersRouter);
apiRouter.use('/auth',authRouter);
module.exports = apiRouter;