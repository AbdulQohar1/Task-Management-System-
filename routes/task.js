const express = require('express');
const router = express.Router();

// create all route requests
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

// embedding all the route requests into router
router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

//export router
module.exports = router;
