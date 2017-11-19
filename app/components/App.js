import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPlayState } from 'modules/player';
import PropTypes from 'prop-types';
import YouTubePlayer from 'components/YoutubePlayer/YoutubePlayer';

class App extends Component {

	/**
	 * Lifecycle
	 */

	state = {
		ytId: null
	}


	/**
	 * Event Handlers
	 */

	updateVideo = () => {
		this.setState({ytId: this.$input.value});
	}



	/**
	 * Renders
	 */

	render() {
		return (
			<div>
				<input ref={(r)=>this.$input=r} />
				<button onClick={this.updateVideo}>update</button>
				<YouTubePlayer
					ytId={this.state.ytId}
					playing={this.props.playing}
					setPlayState={this.props.setPlayState}
				/>
			</div>
		)
	}
}

App.propTypes = {
	playing: PropTypes.bool.isRequired,
	setPlayState: PropTypes.func.isRequired
}

// NOTE: the connect should probabl be moved outside of this file
// again and coded nicer
export default  connect(
	(state)=>({
		playing: state.player.playing
	}),
	(dispatch)=>({
		setPlayState: (playing) => dispatch(setPlayState(playing))
	})
)(App)
