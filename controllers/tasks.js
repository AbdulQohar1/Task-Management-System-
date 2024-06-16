const {Task , validate} = require('../models/task');
const {StatusCodes} = require('http-status-codes');
// const {BadRequest , NotFoundError, BadRequestError} = require('../errors');

// Http request to get all task created by a user
const getAllTasks = async (req , res) => {
  const tasks = await Task.find().sort('taskTitle');

  res.send(tasks);
};

// Http request to get a single task of a particular id created by a user
const getTask = async ( req , res) => {
  let task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send('Task not found');

  res.send(task).status(StatusCodes.OK);
};

// Http request to create a task 
const createTask = async (req , res) => {
  try {
    // validating new task
    const { error } = validate(req.body);
    console.log(validate(req.body));

    if (error) return res.status(400).send(error.details[0].message);

    // creating a new task 
    let task = new Task({
      taskTitle: req.body.taskTitle,
      taskDescription: req.body.taskDescription,
      taskCompleted: req.body.taskCompleted
    })

    task = await task.save();
    res.send(task);
  } catch (error) {
    console.error('Error in createTask:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Updating a task
const updateTask = async (req , res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

  if (!task) return res.status(404).send('Task not found!')

  res.send(task);
};

// deleting a task 
const deleteTask = async (req , res) => {
  let task = await Task.findByIdAndRemove(req.params.id);

  if (!task) return res.status(404).send('Task not found!')
  
  res.send(task);
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};


