import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import styles from "./InfoBar.css";

import Controls from "components/Controls/Controls";
import Playlist from "components/Playlist/Playlist";

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
				<Controls
					playing={playing}
					togglePlay={this.togglePlay}
					activeItem={activeItem}
					progress={progress}
				/>
				<Playlist />
			</div>
		);
	}
}

InfoBar.propTypes = {
	activeItem: PropTypes.object,
	playerStore: PropTypes.object
};
