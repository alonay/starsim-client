import React from "react"
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import * as actions from '../actions';

class Welcome extends React.Component {
  constructor(){
    super()

    this.state = {
      clicked: false,
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
    this.setState({ fields: newFields });
  };

  handleClick = (event) => {
    this.setState({
      clicked: !this.state.clicked,
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { fields: { username, password } } = this.state;
    debugger
    this.props.loginUser(username, password, this.props.history);
  };

  render(){
    const { fields } = this.state;
    const intro =
      <div>
        <h1 className="title">StarSim</h1>
        <p className="slogan">Reach for the Stars, That is Your Craft</p>
        <button onClick={this.handleClick} className="start">Sign in</button>
        <button className="choose-keys">Create Account</button>
      </div>

    let signInForm =
      <form className="ui form sign-in-form" onSubmit={this.handleSubmit}>
        {this.state.error ? <h1>Try Again</h1> : null}
        <div className="three wide field">
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={fields.username}
          />
        </div>
        <div className="three wide field">
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            value={fields.password}
          />
        </div>
        <div className="field">
        </div>
        <button className="ui button" type="submit">Submit</button>
        <button
          className="nevermind"
          onClick={this.handleClick}
          type="submit"
        >Nevermind</button>
      </form>

    return(
      <div className="welcome">
        { (this.state.clicked && signInForm) || intro }
      </div>
    )
  }
}

export default withRouter(connect(null, actions)(Welcome));
