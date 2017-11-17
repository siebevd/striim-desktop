import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

class App extends Component {

	/**
	 * Lifecycle
	 */

	state = {
		ytId: null
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.playing !== nextProps.playing && this.$player) {
			// The playing has changed in the store
			// so let's update the actual video
			if (nextProps.playing) {
				this.$player.playVideo();
			} else {
				this.$player.pauseVideo();
			}
		}
	}

	/**
	 * Event Handlers
	 */

	updateVideo = () => {
		this.setState({ytId: this.$input.value});
	}

	videoReady = (ev) =>{
		this.$player = ev.target;
	}

	/**
	 * Renders
	 */

	render() {
		console.log('is this playing', this.props.playing);
		return (
			<div>
				<input ref={(r)=>this.$input=r} />
				<button onClick={this.updateVideo}>update</button>
				<YouTube
					videoId={this.state.ytId}
					onReady={this.videoReady}
				/>
			</div>
		)
	}
}

App.propTypes = {
	playing: PropTypes.bool.isRequired,
}

// NOTE: the connect should probabl be moved outside of this file
// again and coded nicer
export default  connect(
	(state)=>({
		playing: state.player.playing
	}),
	()=>({})
)(App)
