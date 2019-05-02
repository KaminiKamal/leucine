import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from "redux";
import { Provider } from "react-redux";
import {updateDataList} from "./reducers/index";
//import * as serviceWorker from './serviceWorker';
const store = createStore(updateDataList);

ReactDOM.render(
<Provider store = {store}>
  <App />
</Provider>
  ,
  document.getElementById('root'));