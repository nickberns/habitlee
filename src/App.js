import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CreateHabit from "./components/create-habit.js";
import EditHabit from "./components/edit-habit.js";
import HabitsList from "./components/habits-list.js";

//import logo from "./logo.png";

class App extends Component {

  render (){
    return(
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/"><span role="img">📕</span></a>
          <Link to="/" className="navbar-brand">Habitlee</Link>
          <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">My Habits</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Add</Link>
                  </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={HabitsList} />
          <Route path="/edit/:id" component={EditHabit} />
          <Route path="/create" component={CreateHabit} />
        </div>
      </Router>
    );
  }
}

export default App;
