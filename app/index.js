import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import initThreadConnector from './utils/connector';
import reducers from './modules';
import persistState from 'redux-localstorage'

import VisibleApp from './components/App.js';

//
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	compose(
		applyMiddleware(thunk),
		persistState()
	)
);

// AppContainer is a necessary wrapper component for HMR
const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Component/>
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	);
};

// Connect
initThreadConnector(store);

// document.onreadystatechange = function () {
	// if (document.readyState == "complete") {

		render(VisibleApp);

		// Hot Module Replacement API
		if (module.hot) {
			module.hot.accept('./components/App', () => {
				render(VisibleApp)
			});
		}

	// }
// };
