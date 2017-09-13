import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import { configureStore } from './redux/store/configureStore';
import registerServiceWorker from './utils/register_service_worker';

import './assets/scss/index.scss'

import Root from './core/Root/Root'

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept(Root, () => {
    const newConfigureStore = require('./redux/store/configureStore');
    const newStore = newConfigureStore.configureStore();
    const NewRoot = require('./core/Root/Root').default;
    render(
      <AppContainer>
        <NewRoot store={newStore} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

registerServiceWorker();