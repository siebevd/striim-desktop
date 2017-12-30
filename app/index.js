import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import initThreadConnector from "./utils/connector";
import VisibleApp from "./components/App.js";
import { useStrict, autorun } from "mobx";
import { Provider } from "mobx-react";

import playlistStore from "./stores/playlistStore";
import searchStore from "./stores/searchStore";
import playerStore from "./stores/playerStore";

// Save changes to the store in Localstorage
playlistStore.subscribeLocalstorageToStore();

// Combine the stores
const stores = {
	playlistStore,
	searchStore,
	playerStore
};

window._____APP_STATE_____ = stores;

// Connect Web App to the Application
initThreadConnector(stores);

// AppContainer is a necessary wrapper component for HMR
const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Provider {...stores}>
				<Component />
			</Provider>
		</AppContainer>,
		document.getElementById("root")
	);
};

// Start the render of the app
render(VisibleApp);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept("./components/App", () => {
		render(VisibleApp);
	});
}
