import React from "react";
import * as ReactRedux from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storageLocal from "redux-persist/lib/storage";
import rootReducer from "../ducks/_root";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const PERSIST_CONFIG = {
  key: "root",
  storage: storageLocal,
};

const StoreProvider = ({ history, children }) => {

  const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer(history));

  const middleware = [routerMiddleware(history), thunk];
  const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(...middleware)));
  const persistor = persistStore(store);

  window.store = store;

  return (
    <ReactRedux.Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReactRedux.Provider>
  );

};

export default StoreProvider;
