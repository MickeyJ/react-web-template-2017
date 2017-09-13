import React from 'react'

import Main from './Main/Main'

// CANNOT be connected to redux

const App = () => {
  return (
    <div id="app-container">
      <h1>hello</h1>
      <Main />
      <footer>
        meow
      </footer>
    </div>
  )
};

export default App
