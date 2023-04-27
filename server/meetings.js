// Created by Calum Laverick 27/04/2023

// Create router 
const meetingsRouter = require('express').Router();

// Import helper functions
const { 
    getAllFromDatabase, 
    addToDatabase, 
    deleteAllFromDatabase, 
    createMeeting,
} = require('./db');

// Get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

// Create a new meeting and save it to the database
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});


// Delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
    const deletAllMeetings = deleteAllFromDatabase('meetings');
    res.status(204).send(deletAllMeetings);
});


// Export router
module.exports = meetingsRouter;
