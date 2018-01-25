import React from 'react';
import { withRouter, } from 'react-router-dom'
import { connect, } from 'react-redux';
import * as actions from '../actions';

class Profile extends React.Component {
  constructor() {
    super()

    this.state = {
      clicked: false,
      error: false,
      fields: {
        name: '',
        password: ''
      }
    };
  }

  render() {
    const { currentGamer, } = this.props
    const highScore = currentGamer.profile && currentGamer.profile.high_score

    return(
      <h1 className= "profile">
        Hi {currentGamer.name}! Your highest score is currently {highScore}. Keep Training! 
      </h1>
    )
  }
}

const mapStateToProps = state => ({
  currentGamer: state.auth.currentGamer,
  loggedIn: !!state.auth.currentGamer.id
});

export default withRouter(connect(mapStateToProps, actions)(Profile));
