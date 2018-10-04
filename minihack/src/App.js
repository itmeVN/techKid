import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import {Container} from 'reactstrap';
import './App.css';
import NewGame from './Components/NewGame';
class App extends Component {
  state = {
    game : null
  }

  updateGameState = (gameData) =>{
    this.setState({game : gameData});
  }
  render() {
    return (
      // đây là jsx
      <div className="App">
      <Container>
        <header className="App-header">
          <NavBar />
        </header>
        <div className="content">
            {
              !this.state.game ? <NewGame updateGameState = {this.updateGameState}/> : "Play game!!!"
            }
        </div>
      </Container>
      </div>
    );
  }
}

export default App;
