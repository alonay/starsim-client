import React from "react"
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router-dom';
import * as actions from '../actions';

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
      correct: 0
    }
  };
  handleClick= () =>{
    this.setState({
      clicked: !this.state.clicked
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

  handleUserMatchAttempt = (event) => {

    if (this.state.currentRand === event.target.value ) {

      this.handleRand();
      this.setState({
        currentMouseDown: "",
        correct: this.state.correct + 1
      })

    } else if (event.target.value !== this.state.currentRand.substring(0,event.target.value.length)){

      debugger;
      this.setState({

        currentMouseDown:""


        //person.name.substring(0,this.state.input.length).toLowerCase() ||  this.state.input.toLowerCase() === person.ig.substring(0,this.state.input.length).toLowerCase(
      })
    } else {
      this.setState({
        currentMouseDown:event.target.value
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
      }
    }, 1000);
  }

  render(){
    console.log(this.state)
    let rand = <h1 className= "showrand">{this.state.currentRand}</h1>
    let timeIsUpMessage = <h1 className= "showrand">Time is Up! You got {this.state.correct}</h1>

    return(
      <div>
      <progress value="0" max="30" id="progressBar"></progress><br/>
      <input placeholder="Enter Hot Keys" onKeyDown={this.handleChange}></input>
      <button>Add Key</button><br/>
      <button onClick={this.handleRand}>Start</button> {!this.state.timeUp && rand || this.state.timeUp && timeIsUpMessage}
        <input value={this.state.currentMouseDown} onClick= {this.timeUp} onChange={this.handleUserMatchAttempt}></input>

      </div>
    )
  }
}



export default withRouter(connect(null, actions)(Simulator));
