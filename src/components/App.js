import './App.css';
import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Link, Route, Switch, } from 'react-router-dom';
import * as actions from '../actions';
import Profile from './Profile';
import Welcome from './Welcome';
import Simulator from "./Simulator"

class App extends Component {
  componentDidMount(){
    if (localStorage.getItem('token')){
      this.props.fetchGamer()
    }
  }
  render() {
    console.log(this.props.currentGamer)
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
                  this.props.logoutGamer();
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
          <li>
            <Link to="/simulator">Go to Simulator</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/profile" component={Profile} />
          <Route path="/simulator" component={Simulator}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentGamer: state.auth.currentGamer,
  loggedIn: !!state.auth.currentGamer.id
});
// const mapDispatchToProps = () => {
//   return bindActionCreators({
//     highScore: this.state.highScore
//   }, dispatch);
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Simulator));


export default connect(mapStateToProps, actions)(App);
