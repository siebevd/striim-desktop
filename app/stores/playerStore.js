import { observable, action, computed, autorun } from "mobx";
import { resizeWindow } from "utils/connector";
class PlayerStore {
	@observable playlistVisible = false;
	@observable playing = false;
	@observable totalTime = 0;
	@observable playedTime = 0;

	@computed
	get progress() {
		if (this.totalTime < 1) {
			// Make sure we return a number
			// 0/0 is NaN
			return 0;
		}
		return this.playedTime / this.totalTime;
	}

	@computed
	get remainingTime() {
		const remaining = this.totalTime - this.playedTime;
		const minutes = Math.floor(remaining / 60);
		const seconds = Math.floor(remaining - minutes * 60);

		return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
	}

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

	@action
	updateTotalTime(totalTime) {
		this.totalTime = totalTime;
	}

	@action
	updatePlayedTime(playedTime) {
		this.playedTime = playedTime;
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
