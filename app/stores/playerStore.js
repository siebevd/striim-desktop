import { observable, action, computed } from "mobx";

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

export default PlayerStore;
