import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';    
import {BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import DatePicker from 'antd/es/date-picker'; // for js
import 'antd/es/date-picker/style/css'; // for css
// import { DatePicker } from 'antd';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthStore } from './contexts/AuthStore';

// import 'fontawesome-react/css/all.min.css'

ReactDOM.render(
    <Router>
      <AuthStore>
        <App />
      <DatePicker />, mountNode
      </AuthStore>
    </Router>,
    document.getElementById('root')
  );






























ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

