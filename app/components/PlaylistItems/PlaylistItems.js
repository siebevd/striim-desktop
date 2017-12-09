import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@observer
class PlaylistItems extends Component {


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

		return (
			<div>
				{this.props.items.map((item)=>{
					// console.log('what is item', item);
					return <p key={item.name}>{item.name}</p>
				})}
			</div>
		);
	}
}

export default PlaylistItems;
