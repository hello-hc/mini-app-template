import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

function configStore() {
  const sagamiddleware = createSagaMiddleware();
  const middlewares = [sagamiddleware];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(require("redux-logger").createLogger());
  }

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  store.runSaga = sagamiddleware.run;
  store.close = () => store.dispatch(END);
  store.runSaga(rootSaga);

  return store;
}
const store = configStore();

export const initState = store.getState();
export default store;
