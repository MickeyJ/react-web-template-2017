import React from 'react'

import Main from './Main/Main'
import Header from '../components/Header/Header'

// CANNOT be connected to redux

const App = () => {
  return (
    <div id="app-container">
      <Header />
      <Main />
    </div>
  )
};

export default App
