import React from "react";
import ReactDOM from "react-dom";
import { useStrict, autorun } from "mobx";
import { Provider } from "mobx-react";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import initThreadConnector from "utils/connector";

// Import stores
import playlistStore from "./stores/playlistStore";
import searchStore from "./stores/searchStore";
import playerStore from "./stores/playerStore";

// Import general css
import "./index.css";

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

ReactDOM.render(
	<Provider {...stores}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
