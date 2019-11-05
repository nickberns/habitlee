const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const habitRoutes = express.Router();

let Habit = require('./habit');

app.use(cors());
app.use(bodyParser.json());
app.use('/habits', habitRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/habits', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log(`MongoDB database connection established successfully`);
  }
);

app.listen(PORT, function(){
    console.log(`Server is running on Port: ${PORT}`);
  }
);

habitRoutes.route('/').get(function(req,res){
    Habit.find(function(err, habits){
      if (err){
        console.log(err);
      }
      else {
        res.json(habits);
      }
    });
});

habitRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Habit.findById(id, function(err, habit){
      res.json(habit);
    });
});

habitRoutes.route('/add').post(function(req,res){
  let habit = new Habit(req.body);
  habit.save()
    .then(habit => {
        res.status(200).json({'habit': 'habit added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new habit failed');
    });
});

habitRoutes.route('/update/:id').post(function(req,res){
  Habit.findById(req.params.id, function(err, habit){
    if(!habit){
      res.status(404).send('Data not found.');
        }
    else{
      habit.habit_description = req.body.habit_description;
      habit.habit_priority = req.body.habit_priority;
      habit.habit_completed = req.body.habit_completed;

      habit.save()
          .then(habit => {
            res.json('Habit updated!');
            })
          .catch(err =>{
            res.status(400).send('Update failed!');
          });
        }
      });
  });
