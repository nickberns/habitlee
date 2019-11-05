import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditHabit extends Component{

  constructor(props){
    super(props);

    this.state = {
      habit_description: '',
      habit_priority: '',
      habit_completed: false
    }

    this.onChangeHabitPriority = this.onChangeHabitPriority.bind(this);
    this.onChangeHabitDescription = this.onChangeHabitDescription.bind(this);
    this.onChangeHabitCompleted = this.onChangeHabitCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onChangeHabitCompleted(e){
    this.setState({
      habit_completed: !this.state.habit_completed
    });
  }


  onSubmit(e){
    e.preventDefault();
    const obj = {
      habit_description: this.state.habit_description,
      habit_priority: this.state.habit_priority,
      habit_completed: this.state.habit_completed
    };
    console.log(obj);
    axios.post('http://localhost:4000/habits/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
  }


  componentDidMount(){
    axios.get('http://localhost:4000/habits/'+this.props.match.params.id)
      .then(response => {
          this.setState({
            habit_description: response.data.habit_description,
            habit_priority: response.data.habit_priority,
            habit_completed: response.data.habit_completed
          });
          console.log(`Axios GET in componentDidMount success!`);
      })
      .catch(function(error){
          console.log(error);
          console.log(`Axios GET in componentDidMount failed.`);
      })
  }

  render (){
      return(
          <div>
            <h2 align="center">Update Habit</h2>
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
              <div className="form-check">
                <input className="form-check-input"
                       id="completedCheckbox"
                       type="checkbox"
                       name="completedCheckbox"
                       onChange={this.onChangeHabitCompleted}
                       checked={this.state.habit_completed}
                       value={this.state.habit_completed}/>
                <label className="form-check-label" htmlFor="completedCheckbox">
                Completed</label>
              </div>
              <br/>
              <div className="form-group">
                <input type="submit" value="Update Habit" className="btn btn-primary" />
              </div>
            </form>
          </div>
      );
  }
}
