//
//  Actions
//
const TOGGLE_PLAY = "player/TOGGLE_PLAY";
const SET_PLAY = "player/SET_PLAY";

//
//  Initial State
//
const initialState = {
	playing: false
};

//
// Reducer
//
export default function player(state = initialState, action = {}) {
	switch (action.type) {
		case TOGGLE_PLAY:
			return {
				...state,
				playing: !state.playing
			};
		case SET_PLAY:
			return {
				...state,
				playing: action.playing
			};
		default:
			return state;
	}
}

//
// Action Dispatchers
//

export function setPlayState(playing) {
	return {
		type: SET_PLAY,
		playing: playing
	};
}

export function togglePlay() {
	console.log("toggling play");
	return {
		type: TOGGLE_PLAY
	};
}
