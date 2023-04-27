// Created by Calum Laverick 27/04/2023

// Create router 
const ideasRouter = require('express').Router();

// Import helper functions
const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');


// Middleware functions
ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }
  })

// Get an array of all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// Get a single idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);    
});

// Create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// Update a single idea by id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    let updateIdeaInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updateIdeaInstance);
});

// Delete a single minion by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleteIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleteIdea) {
        res.status(204);
      } else {
        res.status(500);
      }
      res.send();
});

// Export router
module.exports = ideasRouter;
