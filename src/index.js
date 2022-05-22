import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/style.scss';
import App from './components/app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //почему из-за strictMode компонент рендерится 2 раза?
    <App />
);
