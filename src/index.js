import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// importing bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
// importing user context
import { UserContextProvider } from './UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

