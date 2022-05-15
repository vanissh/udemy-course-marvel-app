import './app.scss';
import vision from '../../resources/img/vision.png';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import { Component } from 'react';

class App extends Component {

  state = {
    selectedID: null
  }

  onCharSelected = (id) => {
    this.setState({selectedID: id})
  }

  render(){
    return (
      <div className="app">        
        <AppHeader/>
        <main>
          <RandomChar/>
          <div className="char__content">
            <CharList onCharSelected={this.onCharSelected}/>
            <CharInfo charId={this.state.selectedID}/>
          </div>
          <img className="bg-decoration" src={vision} alt="vision"></img>
        </main>
      </div>
    )
  }
}

export default App;
