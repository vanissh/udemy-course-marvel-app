import './app.scss';
import vision from '../../resources/img/vision.png';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { useState } from 'react';

//ref
//измненения в дочернем компоненте без перерендера
//например, установка фокуса на инпут
//ref - ссылка на элемент или ком-т в dom дереве, те в уже отрисованном интерфейсе

//strict mode???
//разобрать virtual dom

//порталы
 

const App = () => {

  const [selectedID, setID] = useState(null)

  const onCharSelected = (id) => setID(id)

  return (
    <div className="app">        
      <AppHeader/>
      <main>
        <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedID}/>
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={vision} alt="vision"></img>
      </main>
    </div>
  )
}

export default App;
