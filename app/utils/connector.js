import { ipcRenderer } from "electron";
import { togglePlay } from "modules/player";

//
// Connect Rendered to the main thread
//

let store;

export default function initThreadConnector(s) {
	// update the store so we can use it
	// everywhere in the file
	store = s;
}

ipcRenderer.on("playpause", (event, play) => {
	// toggle the play event
	// store.dispatch(togglePlay());
});

ipcRenderer.on("paste", (event, text) => {
	// TODO: validate the text
	// TODO: do a youtube call to get the info about that video
	// TODO: add it to the queue
	console.log("what is the pasted text", text);
});
