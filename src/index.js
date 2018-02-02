import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function renderVelocityGraph(props) {
  ReactDOM.render(<App {...props} />, document.getElementById('root'));
}

window.renderVelocityGraph = renderVelocityGraph;

registerServiceWorker();
