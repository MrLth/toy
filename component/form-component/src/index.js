/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-01 23:22:28
 * @LastEditTime: 2021-02-01 23:46:55
 * @Description: file content
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Form from './form'

ReactDOM.render(
  <React.StrictMode>
    // <App />
    <Form />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
