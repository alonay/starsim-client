import React from "react"
import { connect, } from 'react-redux'
import { withRouter, } from 'react-router-dom'
import * as actions from '../actions/index.js'

class Simulator extends React.Component {
  constructor() {
    super()

    this.state = {
      averageComboTimes: [],
      clicked: false,
      combos: [],
      correct: 0,
      currentMouseDown: "",
      currentRand: "",
      gamers: [],
      highScore: 0,
      input: "",
      timeUp: false,
    }
  }

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked,
      highScore: this.props.currentGamer.profile.high_score,
      startTime: performance.now(),
    })
  }

  handleChange = (event) => {
    // check for corner cases here first!
    let newCombos, newInput

    if (event.key !== 'Backspace' && event.key !== 'Enter') {
      newCombos = this.state.combos.concat(event.key)
      newInput = this.state.input.concat(event.key)
    } else if (event.key === 'Backspace') {
      newCombos = this.state.combos.pop()
      newInput = this.state.input.slice(0, -1)
    }

    this.setState({
      input: newInput,
      combos: newCombos,
    })
  }


  handleRand = () => {
    const maxSize = this.state.combos.length
    const randomLength = Math.ceil(Math.random() * maxSize)
    const randomizedStringArr = []

    for (let charCount = 1; charCount <= randomLength; charCount++)
      randomizedStringArr.push(this.state.combos[Math.floor(Math.random() * this.state.combos.length)])

    // let random = this.state.combos[Math.floor(Math.random()*this.state.combos.length)]
    this.setState({
      currentRand: randomizedStringArr.join(''),
      input: '',
      startTime: performance.now(),
    })
  }

  handleGamerMatchAttempt = (event) => {
    if (this.state.currentRand === event.target.value) {
      const totalTime = performance.now() - this.state.startTime
      console.log("This combo took " + totalTime + " milliseconds.")

      this.handleRand()
      this.setState({
        averageComboTimes: this.state.averageComboTimes.concat(totalTime / event.target.value.length),
        currentMouseDown: '',
        correct: this.state.correct + 1
      }, () => { console.log(this.state.averageComboTimes) })
    } else if (event.target.value !== this.state.currentRand.substring(0, event.target.value.length)) {
      this.setState({
        currentMouseDown: '',
      })
    } else {
      this.setState({
        currentMouseDown:event.target.value
      })
    }
  }

  newHighScore = () => {
    if (this.state.correct > this.state.highScore) {
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
        const totalTime = this.state.averageComboTimes.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        }, 0)

        this.setState({
          timeUp: true,
          averageTime: totalTime / this.state.averageComboTimes.length
        })

        if (this.state.correct > this.state.highScore) {
          this.setState({
            highScore: this.state.correct,
          }, () => this.props.changeHighScore(this.state))
        }
      }
    }, 1000);
  }

  splitRand = () => {
    let splitLetters = this.state.currentRand.split('')
    return splitLetters.map((letter, index) => {
      return <span className="showrand" key={letter + index}>{letter.toUpperCase()}</span>
    })
  }

  render() {
    //let rand = <h1>{this.splitRand()}</h1>
    //let rand = <h1 className="showrand">{this.splitRand()}</h1>
    let timeIsUpMessage = <div className="time-is-up-message">
      <h1>
        Time is Up! You got {this.state.correct} and your high score is now {this.state.highScore}
      </h1>
      <div>Your average key press was {this.state.averageTime}ms</div>
    </div>

    let newHighScoreMessage = <h1>
      New High Score! You got {this.state.correct} your high score is {this.state.highScore}
    </h1>

    let start = <div>
      <div>
        <input className="enter-hot-keys" onKeyDown={this.handleChange} placeholder="Enter Hot Keys" type="text" />
      </div>
      <button className="start-sim" onClick={(event) => { this.handleRand(); this.handleClick(); }}>Start</button>
    </div>

    let timer = <div>
      <progress
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
        {(!this.state.timeUp && this.splitRand()) || (this.state.timeUp && timeIsUpMessage)}
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
