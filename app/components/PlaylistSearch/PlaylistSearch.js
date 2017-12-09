import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@inject('searchStore','playlistStore')
@observer
class PlaylistSearch extends Component {

	/**
	 * Event Handlers
	 */

	updateVideo = () => {
		this.props.searchStore.newSearch(this.$input.value);
	}

	addItem = (result) => {
		this.props.addItem(result.id.videoId);
	}



	/**
	 * Renders
	 */

	render() {
		const { loading, results } = this.props.searchStore;

		return (
			<div>
				<input ref={(r)=>this.$input=r} />
				<button onClick={this.updateVideo}>search</button>
				{loading && 'loading...'}
				{results.map((result)=>(
					<div key={`${result.id.videoId}-result`} onClick={this.addItem.bind(this,result)}>{result.snippet.title}</div>
				))}
			</div>
		);
	}
}

export default PlaylistSearch;
