import { observable, action, computed, autorun } from "mobx";
import { resizeWindow } from "utils/connector";
class PlayerStore {
	@observable playlistVisible = false;
	@observable playing = false;

	@action
	togglePlaylistVisible() {
		this.playlistVisible = !this.playlistVisible;
	}

	@action
	setPlayState(playing) {
		this.playing = playing;
	}

	@action
	togglePlayState() {
		this.playing = !this.playing;
	}
}

// Create the store
const playerStore = new PlayerStore();

autorun(() => {
	let showPlaylist = playerStore.playlistVisible;
	if (showPlaylist) {
		// We need to resize the window
		// so that we can show the playlist without
		// covering the video
		console.log("make the window bigger");
		// TODO: we need to change this once we make the
		// window resizable
		// remote.setSize(800, 580, true);
		resizeWindow(800, 580);
	} else {
		// Get rid of the height from the playlist
		// remote.setSize(800, 515, true);
		resizeWindow(800, 515);
		console.log("make the window smaller");
	}
});

export default playerStore;
