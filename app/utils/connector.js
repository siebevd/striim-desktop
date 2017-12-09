import { ipcRenderer } from 'electron';
import { togglePlay } from 'modules/player';



//
// Connect Rendered to the main thread
//

let store;

export default function initThreadConnector(s) {
	// update the store so we can use it
	// everywhere in the file
	store = s;
}

ipcRenderer.on('playpause', (event, play) => {
	// toggle the play event
	// store.dispatch(togglePlay());
});
