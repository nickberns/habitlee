const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Habit = new Schema({
  habit_description: {
     type: String
   },
  habit_priority: {
     type: String
  },
  habit_completed: {
     type: Boolean
  }
});

module.exports = mongoose.model('Habit', Habit);
