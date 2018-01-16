import React from "react"

class Welcome extends React.Component{
  constructor(){
    super()
    this.state = {
      clicked: false
    }
  }

  handleClick = (event) => {
    this.setState({
      clicked: !this.state.clicked,
    })
  }

  render(){
    const intro =
      <div>
        <h1 className="title">StarSim</h1>
        <p className="slogan">Reach for the Stars, That is Your Craft</p>
        <button onClick={this.handleClick} className="start">Sign in</button>
        <button className="choose-keys">Create Account</button>
      </div>

    let signInForm =
      <form className="ui form sign-in-form">
        <div className="three wide field">
          <input type="text" name="first-name" placeholder="First Name"/>
        </div>
        <div className="three wide field">
          <input type="text" name="last-name" placeholder="Last Name"/>
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
    console.log(this.state)
    return(
      <div className="welcome">
        { (this.state.clicked && signInForm) || intro }
      </div>
    )
  }
}

export  default Welcome;
