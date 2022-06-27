import './app.scss';
import { Routes, Route } from "react-router-dom";
import AppHeader from '../appHeader/AppHeader';
import { MainPage } from '../pages/MainPage';
import { ComicsPage } from '../pages/ComicsPage';

//ref
//измненения в дочернем компоненте без перерендера
//например, установка фокуса на инпут
//ref - ссылка на элемент или ком-т в dom дереве, те в уже отрисованном интерфейсе

//strict mode???
//разобрать virtual dom

//порталы
 
const App = () => {
  return (
    <div className="app">        
      <AppHeader/>
      <main>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='comics' element={<ComicsPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;

