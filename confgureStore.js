import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";

import rootReducer from "./reducers/rootReducer";

export const INITIAL_STATE = {
  tasks: {}
};

const loggerMiddleware = createLogger();

export default function configureStore(initialState = INITIAL_STATE) {
  const store = createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV === "production"
      ? applyMiddleware(thunk)
      : composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
