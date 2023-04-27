// Created by Calum Laverick 26/04/2023
const express = require('express');
const apiRouter = express.Router();

// Importing routers
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');

// Mounting Routers to the apiRouter 
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
