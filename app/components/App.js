import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styling/reset.css';
import s from './App.css';
import YouTubePlayer from 'components/YoutubePlayer/YoutubePlayer';
import Playlist from 'components/Playlist/Playlist';
import Controls from 'components/Controls/Controls';
import DevTools from 'mobx-react-devtools';

import { inject, observer } from 'mobx-react';



@inject('playlistStore')
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



	/**
	 * Renders
	 */

	render() {
		const { list } = this.props.playlistStore;

		return (
			<div>
				<div className={s.titleBar} />
				<DevTools />
				<Playlist />
			</div>
		);


		return (
			<div>
				<div className={s.titleBar} />
				<YouTubePlayer
					ytId={this.props.playlists['main'].items[0]}
					playing={this.props.playing}
					setPlayState={this.props.setPlayState}
				/>
				<Controls />
				<input ref={(r)=>this.$input=r} />
				<button onClick={this.updateVideo}>update</button>
				{this.props.playlists['main'].items.map((item, index)=>{
					return (
						<div key={item}>
							{item}
							<button onClick={()=>this.props.removeVideoFromPlaylist('main', index)}>Remove</button>
						</div>
					)
				})}
			</div>
		)
	}
}

App.propTypes = {
	// playing: PropTypes.bool.isRequired,
	// setPlayState: PropTypes.func.isRequired,
	// addVideoToPlaylist: PropTypes.func.isRequired,
	// removeVideoFromPlaylist: PropTypes.func.isRequired,
	// playlists: PropTypes.object.isRequired
}

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
