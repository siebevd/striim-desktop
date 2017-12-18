import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import PlaylistItem from "components/PlaylistItem/PlaylistItem";
import styles from "./Playlist.css";

@inject("playlistStore", "playerStore")
@observer
class Playlist extends Component {
	/**
	 * Event Handlers
	 */

	updateVideo = () => {
		this.props.playlistStore.addItem(this.$input.value);
	};

	removeItem = index => {
		this.props.playlistStore.removeItemByIndex(index);
	};

	setActiveItem = index => {
		this.props.playlistStore.setActiveItem(index);
	};

	/**
	 * Renders
	 */

	render() {
		const { list, activeIndex } = this.props.playlistStore;

		if (!this.props.playerStore.playlistVisible) {
			return null;
		}

		return (
			<div className={styles.container}>
				{list.map((item, index) => (
					<PlaylistItem
						key={item.id}
						item={item}
						index={index}
						removeItem={this.removeItem}
						setActiveItem={this.setActiveItem}
						active={index === activeIndex}
					/>
				))}
			</div>
		);
	}
}

Playlist.propTypes = {
	playlistStore: PropTypes.object,
	playerStore: PropTypes.object
};

export default Playlist;
