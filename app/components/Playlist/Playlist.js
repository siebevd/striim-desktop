import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import styles from "./Playlist.css";

import PlaylistItem from "components/PlaylistItem/PlaylistItem";

@inject("playlistStore", "playerStore")
@observer
class Playlist extends Component {
	/**
	 * Lifecycle
	 */

	componentWillUpdate(nextProps) {
		// because of mobx nextProps and this.props will always be the same
		//TODO: there must be a better way to do this...
		if (this.activeIndex !== nextProps.playlistStore.activeIndex) {
			this.activeIndex = nextProps.playlistStore.activeIndex;
			// Scroll to the new index
			this.scrollToIndex(this.activeIndex);
		}
	}

	componentWillReact(hello) {
		console.log("the component will update", hello);
	}

	/**
	 * Other Handlers
	 */

	scrollToIndex = newIndex => {
		// Scroll the container to the new active index
		console.log("scroll to index", newIndex);
		window.container = this.$container;
	};

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

		return (
			<div className={styles.container} ref={r => (this.$container = r)}>
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
