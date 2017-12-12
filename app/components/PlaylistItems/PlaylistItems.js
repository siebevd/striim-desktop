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


	removeItem = (index) => {
		this.props.removeItem(index);
	}

	/**
	 * Renders
	 */

	render() {

		return (
			<div>
				{this.props.items.map((item, index)=>{
					// console.log('what is item', item);
					return <p key={item.id}><img src={item.thumb} />{item.title} <button onClick={this.removeItem.bind(this, index)}>Remove</button></p>
				})}
			</div>
		);
	}
}

export default PlaylistItems;
