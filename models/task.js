const mongoose = require('mongoose');
const Joi = require('joi');

// create tast schema 
const TaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40 
},
taskDescription: {
    type: String,
    required: false,
},
taskCompleted: {
    type: Boolean,
    default: false,
},
date: {
  type: String,
  default: Date.now,
}
}, {
  timestamps: true
});

const Task = mongoose.model('Task' , TaskSchema);

function validateTask(task) {
  const schema = Joi.object({
    taskTitle: Joi.string().min(3).max(40).required(),
    taskDescription: Joi.string(),
    taskCompleted: Joi.boolean().default(false)
  });

  const validation = schema.validate(task);
  return validation;
};

exports.Task = Task;
exports.validate = validateTask;