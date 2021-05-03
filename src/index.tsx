//React
import React from "react";
import ReactDOM from "react-dom";

//Router
import { BrowserRouter } from "react-router-dom";

//Start Configs
import './Styles/index.scss';
import App from "./App/View";

//Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import Reducers from "./App/Redux/Reducers";

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.querySelector("main")
);