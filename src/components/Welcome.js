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
        name: '',
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
    const { fields: { name, password } } = this.state;
    this.props.loginGamer(name, password, this.props.history);
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
            name="name"
            onChange={this.handleChange}
            placeholder="Name"
            value={fields.name}
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

const mapStateToProps = state => ({
  currentGamer: state.auth.currentGamer,
  loggedIn: !!state.auth.currentGamer.id
});

export default withRouter(connect(mapStateToProps, actions)(Welcome));
