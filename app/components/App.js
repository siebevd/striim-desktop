import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styling/variables.css";
import "../styling/reset.css";
import styles from "./App.css";
import YouTubePlayer from "components/YoutubePlayer/YoutubePlayer";
import Playlist from "components/Playlist/Playlist";
import Search from "components/Search/Search";
import InfoBar from "components/InfoBar/InfoBar";
import DevTools from "mobx-react-devtools";

import { inject, observer } from "mobx-react";

@inject("playlistStore", "playerStore")
@observer
class App extends Component {
	/**
	 * Lifecycle
	 */

	/**
	 * Event Handlers
	 */

	addItem = result => {
		this.props.playlistStore.addItem(result);
	};

	setPlayState = playState => {
		this.props.playerStore.setPlayState(playState);
	};

	/**
	 * Renders
	 */

	render() {
		const { list, activeItem } = this.props.playlistStore;
		const { playing } = this.props.playerStore;

		console.log("is there an empty state?", activeItem);
		return (
			<div className={styles.container}>
				<div className={styles.titleBar} />
				{activeItem && (
					<YouTubePlayer
						ytId={activeItem.id}
						playing={playing}
						setPlayState={this.setPlayState}
					/>
				)}
				{/* TODO:Improve this empty state... */}
				{!activeItem && (
					<div className={styles.emptyState}>
						<div className={styles.emptyStateContent}>
							No Videos in playlist yet!
						</div>
					</div>
				)}
				<Playlist />
				<Search addItem={this.addItem} />
				{/* <DevTools /> */}
				<InfoBar activeItem={activeItem} />
			</div>
		);
	}
}

App.propTypes = {
	// playing: PropTypes.bool.isRequired,
	// setPlayState: PropTypes.func.isRequired,
	// addVideoToPlaylist: PropTypes.func.isRequired,
	// removeVideoFromPlaylist: PropTypes.func.isRequired,
	// playlists: PropTypes.object.isRequired
};

export default App;
