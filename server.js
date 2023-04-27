// Created by Calum Laverick 26/04/2023

const express = require('express');
const app = express();



/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middleware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Logging Middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
      app.listen(PORT, (error) => {
          console.log(`Server listening on port ${PORT}`);
      });
}

module.exports = app;

