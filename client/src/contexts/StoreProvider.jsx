import React from "react";
import * as ReactRedux from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import rootReducer from "../reducers";

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const StoreProvider = ({ history, children }) => {

  const middleware = [routerMiddleware(history), thunk];
  const store = createStore(rootReducer(history), {}, composeEnhancers(applyMiddleware(...middleware)));
  const persistor = persistStore(store);

  window.store = store;

  return (
    <ReactRedux.Provider store={store}>
     {children}
    </ReactRedux.Provider>
  );

};

export default StoreProvider;
