import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PlaylistSearch from 'components/PlaylistSearch/PlaylistSearch';
import PlaylistItems from 'components/PlaylistItems/PlaylistItems';


@inject('playlistStore')
@observer
class Playlist extends Component {

	/**
	 * Event Handlers
	 */

	updateVideo = () => {
		this.props.playlistStore.addItem(this.$input.value);
	}

	addItem = (result) => {
		this.props.playlistStore.addItem(result);
	}

	/**
	 * Renders
	 */

	render() {
		const { list } = this.props.playlistStore;

		return (
			<div>
				<PlaylistSearch addItem={this.addItem} />
				<PlaylistItems items={list} />
			</div>
		);
	}
}

export default Playlist;
