import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

export default class YoutubePlayer extends Component {

	/**
	 * Lifecycle
	 */

	componentWillReceiveProps(nextProps) {
		if(this.playing !== nextProps.playing && this.$player) {
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
	 * Event Handlers
	 */

	videoReady = (ev) => {
		this.$player = ev.target;
	}

	videoStateChange = (ev) => {

		switch(ev.data) {
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


	}


	videoEnded = (ev) => {
	}

	/**
	 * Renders
	 */

	render() {
		return (
			<div>
				<YouTube
					videoId={this.props.ytId}
					onReady={this.videoReady}
					onStateChange={this.videoStateChange}
					onEnd={this.videoEnded}
				/>
			</div>
		)
	}
}

YoutubePlayer.propTypes = {
	playing: PropTypes.bool.isRequired,
	setPlayState: PropTypes.func.isRequired,
	ytId: PropTypes.string
}
