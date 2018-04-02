import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./YoutubePlayer.css";
import { observer, inject } from "mobx-react";

import YouTube from "react-youtube";

@inject("playerStore")
@observer
export default class YoutubePlayer extends Component {
	loadedId = "";
	/**
	 * Lifecycle
	 */

	componentDidMount() {
		this.timer = setInterval(this.updateProgress, 150);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentWillReceiveProps(nextProps) {
		if (this.playing !== nextProps.playing && this.$player) {
			// The playing has changed in the store
			// so let's update the actual video
			if (nextProps.playing) {
				// this.playing = true;
				this.$player.playVideo();
			} else {
				// this.playing = false;
				this.$player.pauseVideo();
			}
		}
	}

	/**
	 * Data Handlers
	 */

	updateProgress = () => {
		if (this.$player) {
			if (this.loadedId !== this.props.ytId) {
				// This should be put in a better place
				this.props.playerStore.updateTotalTime(this.$player.getDuration());
			}

			this.props.playerStore.updatePlayedTime(this.$player.getCurrentTime());
		}
	};

	/**
	 * Event Handlers
	 */

	videoReady = ev => {
		this.$player = ev.target;
		// this.props.playerStore.updateTotalTime(this.$player.getDuration());
	};

	videoStateChange = ev => {
		switch (ev.data) {
			case -1: // Not Started
				break;
			case 0: // Ended
				break;
			case 1: // Playing
				// No need to do the check if it's already playing,
				// the callback will take care of that
				// this.props.updatePlayerPlaying(true);
				if (!this.playing) {
					this.playing = true;
					this.props.setPlayState(true);
				}

				break;
			case 2: // Paused
				// this.props.updatePlayerPlaying(false);
				if (this.playing) {
					this.playing = false;
					this.props.setPlayState(false);
				}
				break;
			case 3: // Buffering
				break;
			case 5: // cued
				break;
		}
	};

	videoEnded = ev => {
		this.props.goToNextActiveItem();
	};

	/**
	 * Renders
	 */

	render() {
		return (
			<div className={styles.container}>
				<YouTube
					videoId={this.props.ytId}
					onReady={this.videoReady}
					onStateChange={this.videoStateChange}
					onEnd={this.videoEnded}
					className={styles.player}
					opts={{
						playerVars: {
							autohide: 1,
							cc_load_policy: 0,
							autoplay: 1,
							mute: 1,
							showinfo: 0,
							controls: 0,
							// controls: 1,
							rel: 0,
							wmode: "transparent",
							modestbranding: 1,
							iv_load_policy: 3,
							suggestedQuality: "hd1080"
						}
					}}
				/>
			</div>
		);
	}
}

YoutubePlayer.propTypes = {
	playing: PropTypes.bool.isRequired,
	setPlayState: PropTypes.func.isRequired,
	goToNextActiveItem: PropTypes.func.isRequired,
	ytId: PropTypes.string,
	playerStore: PropTypes.object
};
