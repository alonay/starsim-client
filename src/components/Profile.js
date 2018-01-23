import React from 'react';
import withAuth from '../hocs/withAuth';
import { withRouter, } from 'react-router-dom'
import { connect, } from 'react-redux';
import * as actions from '../actions';

class Profile extends React.Component {
  constructor(){
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

  render(){



    return(
      <h1>Hi {this.props.currentGamer.name} your ranking is{this.props.currentGamer.profile.high_score}</h1>
    )
  }
}


//export default withAuth(Profile);

const mapStateToProps = state => ({
  currentGamer: state.auth.currentGamer,
  loggedIn: !!state.auth.currentGamer.id
});

export default withRouter(connect(mapStateToProps, actions)(Profile));
