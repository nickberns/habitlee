import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Habit = props => (
  <tr>
    <td><button onClick={ e => toggleHabit(e, props.habit)}>Send</button></td>
    <td className={props.habit.habit_completed ? 'completed' : ''}>{props.habit.habit_description}</td>
    <td className={props.habit.habit_completed ? 'completed' : ''}>{props.habit.habit_priority}</td>
    <td><Link to={'/edit/'+props.habit._id}>Edit</Link></td>
  </tr>
)

function toggleHabit(e, habit){
    e.preventDefault();
    console.log('clicked!');
    console.log(`${habit.habit_description}`);
    const obj = {
      habit_description: habit.habit_description,
      habit_priority: habit.habit_priority,
      habit_completed: !habit.habit_completed
    };
    axios.post(`http://localhost:4000/habits/update/${habit._id}`, obj)
              .then(res => console.log(res.data));
    updateHabits();
  }

function updateHabits(){
  axios.get('http://localhost:4000/habits')
    .then(response => {
        ///this.setState({ habits : response.data});
        //new HabitsList().setState({ habits : response.data});
        console.log('GET request sent!');
    })
    .catch(function(error){
      console.log(error);
    })
}

export default class HabitsList extends Component{

  constructor(props){
    super(props);
    this.state ={habits: []};
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:4000/habits')
      .then(response => {
          this.setState({ habits : response.data});
      })
      .catch(function(error){
        console.log(error);
      })
  };

  habitList(){
    return this.state.habits.map(function(currentHabit, i){
      return <Habit habit={currentHabit} key={i} />;
    });
  }

  render (){
      return(
        <div>
          <h1><span>🏆</span> My Habits</h1>
          <table className="table table-striped" style={{marginTop:20}}>
            <thead>
            <tr>
                <th>Status</th>
                <th>Habit</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.habitList() }
            </tbody>
          </table>
        </div>
      );
  }
}
