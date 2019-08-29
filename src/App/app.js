//  Import CSS.
import './style.scss?result';

import  React, { Component } from  'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux';
import { connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Posts from './views/Posts/index'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {store, persistor} from './configureStore'
import registerServiceWorker from './registerServiceWorker';


/*store.dispatch({
  type: ADD_CATEGORY
});*/


class  App  extends  Component {
    render() {

        return (
            <div  className="App">
              <Provider store={store}>
               <PersistGate persistor={persistor}>
                <Router >
                  <header className={"entry-header"}>
                    <h1 className={"entry-title"}>
                      Journal        </h1>
                  </header>
                  <div className="container">
                    <Route path="/:id" component={Posts} />
                  </div>
              </Router>
              </PersistGate>
            </Provider>
          </div>
      );
    }
}


$(function() { /* code here */
  if ( document.querySelector('main#blog') ) {
    ReactDOM.render(
      <App/>,
      document.querySelector('main#blog')
    );
    registerServiceWorker();
  }

});
