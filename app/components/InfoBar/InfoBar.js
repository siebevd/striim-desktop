import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import styles from "./InfoBar.css";

@inject("playerStore")
@observer
export default class InfoBar extends Component {
	/**
	 * Lifecycle
	 */

	/**
	 * Event Handlers
	 */

	togglePlaylist = () => {
		this.props.playerStore.togglePlaylistVisible();
	};

	togglePlay = () => {
		this.props.playerStore.togglePlayState();
	};

	playPrevious = () => {};

	playNext = () => {};

	/**
	 * Renders
	 */

	render() {
		const { playerStore, activeItem } = this.props;
		const { playlistVisible, playing, progress, remainingTime } = playerStore;

		return (
			<div className={styles.container}>
				<div className={styles.centerContent}>
					<button className={styles.prevButton} onClick={this.playPrevious} />
					<button className={styles.playButton} onClick={this.togglePlay}>
						{!playing && <div className={styles.playIcon} />}
						{playing && <div className={styles.pauseIcon} />}
					</button>
					<button className={styles.nextButton} onClick={this.playNext} />
					<div className={styles.trackInfo}>
						<div className={styles.trackName}>{activeItem.title}</div>
						<div className={styles.progressContainer}>
							<div className={styles.progressBar}>
								<div
									className={styles.progress}
									style={{ transform: `translateX(-${100 - progress * 100}%)` }}
								/>
							</div>
							<div className={styles.progressTime}>-{remainingTime}</div>
						</div>
					</div>
				</div>
				<div className={styles.sideContent}>
					<button onClick={this.togglePlaylist}>
						{playlistVisible ? "hide" : "show"} playlist
					</button>
				</div>
			</div>
		);
	}
}

InfoBar.propTypes = {
	activeItem: PropTypes.object.isRequired,
	playerStore: PropTypes.object
};
