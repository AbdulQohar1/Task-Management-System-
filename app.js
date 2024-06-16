require ('express-async-errors');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// connectDB
const connectDB = require('./db/connectDB');
const authenticateUser = require('./middlewares/authentication');

// routers
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/task');

// error handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

// routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/tasks' , authenticateUser, tasksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3500;

const start = async () => {
  try {
    await connectDB (process.env.MONGO_URI);
    app.listen( port , () => console.log(`Listening on port ${port}...`));

  } catch (error) {
    console.log(error)
  }
};

start();