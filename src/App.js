import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers/'
import Container from './container';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container {...this.props} />
      </Provider>
    );
  }
}

export default App;
