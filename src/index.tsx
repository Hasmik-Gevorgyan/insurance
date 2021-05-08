import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { HashRouter as Router, Route, RouteComponentProps } from 'react-router-dom';

ReactDOM.render(
  <Router hashType="noslash">
    <React.StrictMode>
      <Route path="/" render={(props: RouteComponentProps) => <App {...props} />} />
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);
