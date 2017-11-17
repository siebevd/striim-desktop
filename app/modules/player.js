
//
//  Actions
//
const TOGGLE_PLAY = 'player/TOGGLE_PLAY';


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
			}
		default:
			return state;
	}
}

//
// Action Dispatchers
//


export function togglePlay() {
	console.log('toggling play');
	return {
			type: TOGGLE_PLAY
		}
}
