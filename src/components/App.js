import './App.css';
import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Link, Route, Switch, } from 'react-router-dom';
import * as actions from '../actions';
import Profile from './Profile';
import Welcome from './Welcome';

class App extends Component {
  render() {
    return (
      <div>
        <div className="video-background">
          <div className="video-foreground">
            <iframe
              src="https://www.youtube.com/embed/ZBcl5C4MRw4?controls=0&showinfo=0&rel=0&autoplay=1&loop=1"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Background Video"
            ></iframe>
          </div>
        </div>
        <ul>
          <li>
            {this.props.loggedIn ? (
              <a
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutUser();
                }}
              >
                Sign Out
              </a>
            ) : (
              <Link to="/welcome">Go to Login</Link>
            )}
          </li>
          <li>
            <Link to="/profile">Go to Profile</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});

export default connect(mapStateToProps, actions)(App);
