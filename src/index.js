import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';    
import {BrowserRouter as Router} from 'react-router-dom';

import 'antd/dist/antd.css';


import { AuthStore } from './contexts/AuthStore';

ReactDOM.render(
  <Router>
    <AuthStore>
      <App />
    </AuthStore>
  </Router>,
  document.getElementById('root')
);
