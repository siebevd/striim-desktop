import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styles from "./Search.css";

@inject("searchStore", "playlistStore")
@observer
class PlaylistSearch extends Component {
	/**
	 * Event Handlers
	 */

	updateVideo = () => {
		this.props.searchStore.newSearch(this.$input.value);
	};

	addItem = result => {
		// Get info from the result
		this.props.addItem(result);
	};

	/**
	 * Renders
	 */

	render() {
		const { loading, results } = this.props.searchStore;
		return (
			<div className={styles.container}>
				<input ref={r => (this.$input = r)} />
				<button onClick={this.updateVideo}>search</button>
				{loading && "loading..."}
				{results.map(result => (
					<div
						key={`${result.id}-result`}
						onClick={this.addItem.bind(this, result)}
					>
						<img src={result.thumb} />
						{result.title} - {result.artist}
					</div>
				))}
			</div>
		);
	}
}

export default PlaylistSearch;
