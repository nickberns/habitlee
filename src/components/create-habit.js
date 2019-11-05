import React, { Component } from 'react';
import axios from 'axios';

export default class CreateHabit extends Component{

  constructor(props){
    super(props);

    this.onChangeHabitDescription = this.onChangeHabitDescription.bind(this);
    this.onChangeHabitPriority = this.onChangeHabitPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        habit_description: '',
        habit_priority: '',
        habit_completed: false
      }
    }

  onChangeHabitDescription(e){
    this.setState({
      habit_description: e.target.value
    });
  }

  onChangeHabitPriority(e){
    this.setState({
      habit_priority: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    console.log(`Form submitted: `);
    console.log(`Habit Description: ${this.state.habit_description}`);
    console.log(`Habit Priority: ${this.state.habit_priority}`);

    const newHabit = {
      habit_description: this.state.habit_description,
      habit_priority: this.state.habit_priority,
      habit_completed: this.state.habit_completed
    };

    axios.post('http://localhost:4000/habits/add', newHabit)
      .then(res => console.log(res.data));

    this.setState({
      habit_description: '',
      habit_priority: '',
      habit_completed: false
    });
  }


  render (){
      return(
      <div style={{marginTop: 10}}>
        <h3>Create A New Habit 🙌</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description : </label>
              <input type="text"
              className="form-control"
              value={this.state.habit_description}
              onChange={this.onChangeHabitDescription} />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={this.state.habit_priority==='Low'}
              onChange={this.onChangeHabitPriority}/>
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={this.state.habit_priority==='Medium'}
              onChange={this.onChangeHabitPriority}/>
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={this.state.habit_priority==='High'}
              onChange={this.onChangeHabitPriority}/>
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Habit" className="btn btn-primary" />
          </div>
        </form>
      </div>
      );
  }
}
