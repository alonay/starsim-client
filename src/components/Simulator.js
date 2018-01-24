import React from "react"
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import * as actions from '../actions/index.js';

class Simulator extends React.Component {
  constructor(){
    super()
    this.state = {
      input:"",
      combos:[],
      clicked: false,
      currentRand:"",
      currentMouseDown:"",
      timeUp: false,
      correct: 0,
      highScore: 0,
      gamers:[]
    }
  };

  handleClick= () =>{
    this.setState({
      clicked: !this.state.clicked,
      highScore: this.props.currentGamer.profile.high_score
    })
  }

  handleChange = (event) => {
    // check for corner cases here first!
    if (event.key !== "Backspace"){
    this.state.combos.push(event.key)
    }
    const newInput = this.state.input
    newInput.concat(event.key)
    this.setState({
      input: newInput
    })
  }


  handleRand = () => {
    const maxSize = this.state.combos.length
    const randomLength = Math.ceil(Math.random() * maxSize)
    const randomizedStringArr = []
    for (let charCount = 1; charCount <= randomLength; charCount++)
      randomizedStringArr.push(this.state.combos[Math.floor(Math.random()*this.state.combos.length)])
    // let random = this.state.combos[Math.floor(Math.random()*this.state.combos.length)]
    this.setState({
      currentRand: randomizedStringArr.join(''),
      input:"",
    })
  }

  handleGamerMatchAttempt = (event) => {

    if (this.state.currentRand === event.target.value ) {
      this.handleRand();
      this.setState({
        currentMouseDown: "",
        correct: this.state.correct + 1
      })
    } else if (event.target.value !== this.state.currentRand.substring(0,event.target.value.length)){
      this.setState({
        currentMouseDown:""
      })
    } else {
      this.setState({
        currentMouseDown:event.target.value
      })
    }
  }

  newHighScore = () => {

    if (this.state.correct > this.state.highScore){
      this.setState({
        highScore: this.props.currentGamer.high_score
      })
    }
  }

  timeUp = () => {
    var timeleft = 30;
    var downloadTimer = setInterval(() => {
      document.getElementById("progressBar").value = 30 - --timeleft;
      if (timeleft <= 0) {
        clearInterval(downloadTimer);

        this.setState({
          timeUp: true
        })
        if (this.state.correct > this.state.highScore) {
          this.setState({
            highScore: this.state.correct
          }, ()=> this.props.changeHighScore(this.state))
        }
      }
    }, 1000);
  }

  render() {
    let rand = <h1 className="showrand">{this.state.currentRand}</h1>
    let timeIsUpMessage = <h1 className="showrand">Time is Up! You got {this.state.correct} your high score is {this.state.highScore}</h1>
    let start =
    <div>
      <div>
        <input onKeyDown={this.handleChange} placeholder="Enter Hot Keys" type="text" />
      </div>
      <button onClick={(event) => { this.handleRand(); this.handleClick();}}>Start</button>
      <button>Add Key</button><br/>
    </div>

    let timer = <div><progress
      className="timer"
      value="0"
      max="30"
      id="progressBar"
    >
    </progress>
    </div>

    let matchInput = <div className="match">
      <input
        value={this.state.currentMouseDown}
        onChange={this.handleGamerMatchAttempt}
        onClick={this.timeUp}
        type="text"
      />
    </div>

    return(
      <div className="simulator-container">
        {(!this.state.clicked && start) || (this.state.clicked && timer)}
        {(!this.state.timeUp && rand) || (this.state.timeUp && timeIsUpMessage)}
        {(this.state.clicked && !this.state.timeUp) && matchInput}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentGamer: state.auth.currentGamer,
  loggedIn: !!state.auth.currentGamer.id
});


export default withRouter(connect(mapStateToProps, actions)(Simulator));
