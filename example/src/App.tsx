import React from 'react'
import { Provider } from "react-redux";
import { FormJsonConfig } from 'ra-shop'
import {createStore, applyMiddleware}  from 'redux';
import Reducer from './reducers';

const config = {
  fields: {
    name: {
      ui: { widget: 'text' },
      label: 'Name'
    }
  }
}

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(Reducer);


const App = () => {
  return <Provider store={store}>
    <FormJsonConfig config={config}/>
  </Provider>
}

export default App
