import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styling/variables.css";
import "../styling/reset.css";
import styles from "./App.css";

import Controls from "components/Controls/Controls.jsx";
import YouTubePlayer from "components/YoutubePlayer/YoutubePlayer.jsx";
import Search from "components/Search/Search.jsx";
import InfoBar from "components/InfoBar/InfoBar.jsx";
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

	goToNextActiveItem = playState => {
		this.props.playlistStore.goToNextActiveItem();
	};

	setPlayState = playState => {
		this.props.playerStore.setPlayState(playState);
	};

	/**
	 * Renders
	 */

	render() {
		const { list, activeItem } = this.props.playlistStore;
		const { playing, progress } = this.props.playerStore;

		return (
			<div className={styles.container}>
				<div className={styles.titleBar} />
				{activeItem && (
					<YouTubePlayer
						ytId={activeItem.id}
						playing={playing}
						setPlayState={this.setPlayState}
						goToNextActiveItem={this.goToNextActiveItem}
					/>
				)}
				<Controls
					playing={playing}
					togglePlay={this.togglePlay}
					activeItem={activeItem}
					progress={progress}
				/>

				{/* TODO:Improve this empty state... */}
				{!activeItem && (
					<div className={styles.emptyState}>
						<div className={styles.emptyStateContent}>
							No Videos in playlist yet!
						</div>
					</div>
				)}
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
