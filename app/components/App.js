import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styling/variables.css";
import "../styling/reset.css";
import s from "./App.css";
import YouTubePlayer from "components/YoutubePlayer/YoutubePlayer";
import Playlist from "components/Playlist/Playlist";
import Search from "components/Search/Search";
import InfoBar from "components/InfoBar/InfoBar";
import DevTools from "mobx-react-devtools";

import { inject, observer } from "mobx-react";

@inject("playlistStore", "playerStore")
@observer
class App extends Component {
	/**
	 * Lifecycle
	 */
	//
	// state = {
	// 	ytId: null
	// }

	/**
	 * Event Handlers
	 */

	addItem = result => {
		this.props.playlistStore.addItem(result);
	};

	setPlayState = playState => {
		this.props.playerStore.setPlayState(playState);
	};

	/**
	 * Renders
	 */

	render() {
		const { list, activeItem } = this.props.playlistStore;
		const { playing } = this.props.playerStore;

		console.log("this is the playlistStore", this.props.playlistStore);

		return (
			<div>
				<div className={s.titleBar} />
				<YouTubePlayer
					ytId={activeItem.id}
					playing={playing}
					setPlayState={this.setPlayState}
				/>
				<Search addItem={this.addItem} />
				<DevTools />
				<Playlist />
				<InfoBar />
			</div>
		);

		// return (
		// 	<div>
		// 		<div className={s.titleBar} />
		// 		<YouTubePlayer
		// 			ytId={this.props.playlists['main'].items[0]}
		// 			playing={this.props.playing}
		// 			setPlayState={this.props.setPlayState}
		// 		/>
		// 		<input ref={(r)=>this.$input=r} />
		// 		<button onClick={this.updateVideo}>update</button>
		// 		{this.props.playlists['main'].items.map((item, index)=>{
		// 			return (
		// 				<div key={item}>
		// 					{item}
		// 					<button onClick={()=>this.props.removeVideoFromPlaylist('main', index)}>Remove</button>
		// 				</div>
		// 			)
		// 		})}
		// 	</div>
		// )
	}
}

App.propTypes = {
	// playing: PropTypes.bool.isRequired,
	// setPlayState: PropTypes.func.isRequired,
	// addVideoToPlaylist: PropTypes.func.isRequired,
	// removeVideoFromPlaylist: PropTypes.func.isRequired,
	// playlists: PropTypes.object.isRequired
};

export default App;

// NOTE: the connect should probabl be moved outside of this file
// again and coded nicer
// export default  connect(
// 	(state)=>({
// 		playing: state.player.playing,
// 		playlists: state.playlists
// 	}),
// 	(dispatch)=>({
// 		setPlayState: (playing) => dispatch(setPlayState(playing)),
// 		addVideoToPlaylist: (playlistId, video) => dispatch(addVideoToPlaylist(playlistId, video)),
// 		removeVideoFromPlaylist: (playlistId, index) => dispatch(removeVideoFromPlaylist(playlistId, index))
// 	})
// )(App)
