import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from './components/app/app';
import createAPI from './api';
import {reducer} from './reducer';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const init = () => {
  const api = createAPI();
  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
