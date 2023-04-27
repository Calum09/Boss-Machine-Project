// Created by Calum Laverick 27/04/2023

// Create router 
const minionsRouter = require('express').Router();

const {  
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    } = require('./db');


// Middleware functions
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.status(404).send();
    }
  })



// Get an array of all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// Get a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);    
});

// Create a new minion and save it to the database
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// Update a single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
});

// Delete a single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deletedMinion) {
        res.status(204);
      } else {
        res.status(500);
      }
      res.send();
});

//////////////////////////////////////////////// MINIONS WORK

// Get an array of all work specified for a minion
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = getAllFromDatabase('work').filter((singleWork) => {
    return singleWork.minionId === req.params.minionId;
  });
  res.send(work);  
});

// Create a new work object and save it to the database
minionsRouter.post('/:minionId/work', (req, res, next) => {
  const addWork = req.body;
  addWork.minionId = req.params.minionId;
  const createdWork = addToDatabase('work', addWork);
  res.status(201).send(createdWork);
});

// Work Param Middleware 
minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

// Update a single work by id
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
  } else {
      let updateWork = updateInstanceInDatabase('work', req.body);
      res.send(updateWork);
  }
});

// Delete a single work by id
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const deleteWork =deleteFromDatabasebyId('work', req.params.workId);
  if (deleteWork) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

// Export router
module.exports = minionsRouter;
