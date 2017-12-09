import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import initThreadConnector from './utils/connector';
import VisibleApp from './components/App.js';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import PlaylistStore from './stores/playlistStore';
import SearchStore from './stores/searchStore';


const playlistStore = new PlaylistStore(JSON.parse(localStorage.getItem('playlist') || '{}'));
const searchStore = new SearchStore();

// Save changes to the store in Localstorage
playlistStore.subscribeLocalstorageToStore();


// Combine the stores
const stores = {
	playlistStore,
	searchStore
}

window._____APP_STATE_____ = stores;


// Connect Web App to the Application
initThreadConnector(stores);

// AppContainer is a necessary wrapper component for HMR
const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider {...stores}>
				<Component/>
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	);
};

// Start the render of the app
render(VisibleApp);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/App', () => {
		render(VisibleApp)
	});
}
