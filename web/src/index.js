import React from 'react';
import ReactDOM from 'react-dom';
import { initAxios } from '@/utils/request';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const apiHost = 'localhost:3389';

initAxios({
  baseURL: `//${apiHost}/api`,
  params: {
    // appType: 1,
  },
  timeout: 15000,
  withCredentials: true,
  headers: { 'Content-type': 'application/json' },
});

ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
