import React, { Component } from 'react';
import logo from './wombat_outline.svg';
import './App.css';

class App extends Component {
  state = {
    things: null,
    s3ImageURL: '',
    currentTime: null,
    wombatResponse: ''
  };

  componentDidMount() {
    // Retrieve a list of things from the server to test the availability of the server's API.
    fetch('/api/things')
      .then(response => response.json())
      .then(things => this.setState({ things }));

    // Ask the server process to save an image in S3, then display the returned image URL.
    // This will test connectivity and authentication between the server process and S3,
    // as well as proper configuration for the S3 bucket.
    fetch('/api/s3Image')
      .then(response => response.json())
      .then(response => this.setState({ s3ImageURL: response.fileURL }));

    // Ask the server process to query the database for the current time. This will test
    // connectivity and authentication between the server process and RDS, as well as
    // proper configuration and deployment of the RDS database.
    fetch('/api/currentTime')
      .then(response => response.json())
      .then(response => this.setState({ currentTime: response.currentTime }));

    // Ask the server process to call the Lambda function and return the results. This will
    // test connectivity and authentication between the server process and Lambda, as well
    // as proper configuration and deployment of the Lambda function.
    fetch('/api/askTheWombat')
      .then(response => response.json())
      .then(response => this.setState({ wombatResponse: response.message }));
  }

  getThingsToDoComponent() {
    if (Boolean(this.state.things)) {
      return (
        <div>
          <strong>BONUS ONE unlocked:</strong> Here is our list of things to do:<br/>
          <ol>
          {
            this.state.things.map(
              thing =>
                <li key={thing.id}>{thing.description}</li>
            )
          }
          </ol>
        </div>
      );
    } else {
      return <div className="App-missing"><strong>Application installation unfinished:</strong> We don{"'"}t know what to do.</div>;
    }
  }

  getS3ImageURLComponent() {
    if (Boolean(this.state.s3ImageURL)) {
      return (
        <div>
          <strong>BONUS ONE unlocked:</strong> This is a wombat from S3:
          <img src={this.state.s3ImageURL}/>
        </div>
      );
    } else {
      return <div className="App-missing"><strong>BONUS ONE unfinished:</strong> We can{"'"}t find a wombat in S3.</div>;
    }
  }

  getCurrentTimeComponent() {
    if (Boolean(this.state.currentTime)) {
      return (
        <div>
          <strong>BONUS TWO unlocked:</strong> The database thinks the time is {this.state.currentTime}.
        </div>
      );
    } else {
      return <div className="App-missing"><strong>BONUS TWO unfinished:</strong> We don{"'"}t know what time the database thinks it is.</div>;
    }
  }

  getWombatQuestionComponent() {
    if (Boolean(this.state.wombatResponse)) {
      return (
        <div>
          <strong>BONUS THREE unlocked:</strong> The wombat says "{this.state.wombatResponse}"
        </div>
      );
    } else {
      return <div className="App-missing"><strong>BONUS THREE unfinished:</strong> We don{"'"}t know what the wombat has to say.</div>;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Waymark{"'"}s Devops Project!</h1>
        </header>

        <h2>Things to do:</h2>
        <div className="App-things-to-do">
          {
            this.getThingsToDoComponent()
          }
        </div>

        <div className="App-s3-image">
          {
            this.getS3ImageURLComponent()
          }
        </div>

        <div className="App-current-time">
          {
            this.getCurrentTimeComponent()
          }
        </div>

        <div className="App-wombat-question">
          {
            this.getWombatQuestionComponent()
          }
        </div>

      </div>
    );
  }
}

export default App;
