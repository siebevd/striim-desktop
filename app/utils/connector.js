import { ipcRenderer } from "electron";
import { togglePlay } from "modules/player";
import playerStore from "stores/PlayerStore";

//
// Connect Rendered to the main thread
//

export default function initThreadConnector(s) {
	// update the store so we can use it
	// everywhere in the file
	// Not sure if this function is still needed
}

/**
 * Listeners
 */

ipcRenderer.on("playpause", (event, play) => {
	// toggle the play event
	playerStore.togglePlayState();
});

ipcRenderer.on("paste", (event, text) => {
	// TODO: validate the text
	// TODO: do a youtube call to get the info about that video
	// TODO: add it to the queue
	console.log("what is the pasted text", text);
});

/**
 * Dispatchers
 */

function resizeWindow(width, height) {
	console.log("resize the window");
	ipcRenderer.send("resize", { width, height });
}

export { resizeWindow };
