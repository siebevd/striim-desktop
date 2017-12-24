import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styles from "./Search.css";
import classNamesBind from "classnames/bind";

const classNames = classNamesBind.bind(styles);

@inject("searchStore", "playlistStore")
@observer
class PlaylistSearch extends Component {
	state = {
		searchActive: false
	};
	/**
	 * Data Handlers
	 */

	updateResults = () => {
		this.props.searchStore.newSearch(this.$input.value);
	};

	/**
	 * Event Handlers
	 */

	addItem = result => {
		// Get info from the result
		this.props.addItem(result);

		// Hide the search bar again
		this.toggleSearch;
	};

	toggleSearch = () => {
		const newSearchActive = !this.state.searchActive;
		this.setState({ searchActive: newSearchActive });

		if (newSearchActive) {
			// Focus on the input field, so they can start typing immediatelly
			this.$input.focus();
		} else {
			this.$input.blur();
			// Clear the value of the field
			this.$input.value = "";
		}
	};

	clearSearch = () => {
		// Clear the value
		this.$input.value = "";
		// Reset the list
		this.props.searchStore.resetList();
	};

	keyDownHandler = ev => {
		if (ev.which === 13) {
			// Enter key is pressed
			this.updateResults();
		}

		if (ev.which === 27) {
			// Escape button
			this.toggleSearch();
		}
	};

	/**
	 * Renders
	 */

	render() {
		const { loading, results } = this.props.searchStore;
		const resultsAvailable = results.length > 0;

		const containerStyles = classNames({
			container: true,
			searchActive: this.state.searchActive,
			loading: loading
		});

		let resultsList = "";

		if (resultsAvailable) {
			// The results are here, so show the results
			resultsList = (
				<ul className={styles.results}>
					{results.slice(0, 5).map(result => (
						<li
							className={styles.resultItem}
							key={`${result.id}-result`}
							onClick={this.addItem.bind(this, result)}
						>
							<div
								className={styles.resultThumb}
								style={{ backgroundImage: `url(${result.thumb})` }}
							/>
							<p className={styles.resultInfo}>
								{result.title}
								<span className={styles.resultArtist}>by {result.artist}</span>
							</p>
						</li>
					))}
				</ul>
			);
		}

		// if (loading) {
		// 	// Show loading screen
		// 	// TODO: improve loading here
		// 	// IDEA: should we change the search icon to a load icon
		// 	// with a cool animation instead of showing the loading here
		// 	resultsList = (
		// 		<ul className={styles.results}>
		// 			<li>Loading...</li>
		// 		</ul>
		// 	);
		// }

		// in a plane right now, so search icon is coded instead
		// just being a svg
		return (
			<div className={containerStyles}>
				<div className={styles.topContainer}>
					<button className={styles.searchIcon} onClick={this.toggleSearch}>
						<div className={styles.loadIcon} />
					</button>
					<input
						ref={r => (this.$input = r)}
						className={styles.search}
						onKeyDown={this.keyDownHandler}
					/>

					{/* TODO: should we add a close button?*/}
					<button className={styles.clear} onClick={this.toggleSearch} />
				</div>

				{resultsList}
			</div>
		);
		return (
			<div className={styles.container}>
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
