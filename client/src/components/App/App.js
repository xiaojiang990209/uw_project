import React from 'react';
import './App.css';
import Menu from '../Menu/Menu'


const App = ({children}) =>
  <div className='flex-container'>
    <Menu />
    <div id="main-content">
      {children}
    </div>
  </div>

export default App;
