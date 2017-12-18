import { observable, action, computed, autorun } from "mobx";

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
	} else {
		console.log("make the window smaller");
	}
});

export default playerStore;
