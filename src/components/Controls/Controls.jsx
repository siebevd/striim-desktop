import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import styles from "./Controls.css";

@observer
export default class Controls extends Component {
	/**
	 * Lifecycle
	 */

	/**
	 * Event Handlers
	 */

	/**
	 * Renders
	 */

	render() {
		const { playing, togglePlay, activeItem, progress } = this.props;

		if (!activeItem) {
			return null;
		}

		return (
			<div className={styles.container}>
				<button className={styles.playButton} onClick={togglePlay}>
					{!playing && <div className={styles.playIcon} />}
					{playing && <div className={styles.pauseIcon} />}
				</button>
				<div className={styles.activeInfo}>
					<p className={styles.trackName}>{activeItem.title}</p>
					<p className={styles.trackAuthor}>by {activeItem.artist}</p>
				</div>
				<div className={styles.progress}>
					<div
						className={styles.progressBar}
						style={{ transform: `translateX(-${100 - progress * 100}%)` }}
					/>
				</div>
			</div>
		);
	}
}

Controls.propTypes = {
	playing: PropTypes.bool.isRequired,
	togglePlay: PropTypes.func.isRequired,
	activeItem: PropTypes.object,
	progress: PropTypes.number
};
