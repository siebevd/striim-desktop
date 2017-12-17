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

	/**
	 * Renders
	 */

	render() {
		const { playlistVisible } = this.props.playerStore;
		return (
			<div className={styles.container}>
				<button onClick={this.togglePlaylist}>
					{playlistVisible ? "hide" : "show"} playlist
				</button>
			</div>
		);
	}
}

InfoBar.propTypes = {};
