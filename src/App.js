import React, { Component, } from 'react';
import './App.css';
import Welcome from "./welcome"

class App extends Component {
  render() {

    return (
      <div>
        <div class="video-background">
          <div class="video-foreground">
            <iframe
              src="https://www.youtube.com/embed/ZBcl5C4MRw4?controls=0&showinfo=0&rel=0&autoplay=1&loop=1"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="Background Video"
            ></iframe>
          </div>
        </div>
        <Welcome/>
      </div>
    );
  }
}

export default App;
