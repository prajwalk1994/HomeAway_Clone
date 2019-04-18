import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/Home/Main';
import {Provider} from 'react-redux';
import {store} from './store';
import {persistor} from './store';
//Redux-persist
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  render() {
    console.log(store);
    return (
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Main/>
            </div>
          </BrowserRouter>
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
