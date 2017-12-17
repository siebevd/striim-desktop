import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PlaylistItems from "components/PlaylistItems/PlaylistItems";

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

	/**
	 * Renders
	 */

	render() {
		const { list } = this.props.playlistStore;

		if (!this.props.playerStore.playlistVisible) {
			return null;
		}

		return (
			<div>
				<PlaylistItems items={list} removeItem={this.removeItem} />
			</div>
		);
	}
}

export default Playlist;
