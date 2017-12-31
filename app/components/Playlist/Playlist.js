import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import styles from "./Playlist.css";
import scrollTo from "utils/scrollTo.js";

import PlaylistItem from "components/PlaylistItem/PlaylistItem";

@inject("playlistStore", "playerStore")
@observer
class Playlist extends Component {
	itemRefs = {};

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

	componentDidMount() {
		const activeItem = this.itemRefs[
			`item-${this.props.playlistStore.activeIndex}`
		];
		if (activeItem) {
			// Make sure the scroll is set to the right item
			this.$container.scrollLeft = activeItem.offsetLeft;
		}
	}

	/**
	 * Other Handlers
	 */

	scrollToIndex = newIndex => {
		// Scroll the container to the new active index
		const newActiveItem = this.itemRefs[`item-${newIndex}`];

		if (newActiveItem) {
			// Scroll to the position of the new active item
			scrollTo(this.$container, newActiveItem.offsetLeft, 400);
		}
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
						domRef={r => (this.itemRefs[`item-${index}`] = r)}
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
