import './app.scss';
import vision from '../../resources/img/vision.png';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
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
          <ErrorBoundary>
            <RandomChar/>
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedID}/>
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={vision} alt="vision"></img>
        </main>
      </div>
    )
  }
}

export default App;
