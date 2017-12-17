//
//  Actions
//
const ADD_VIDEO = "playlists/ADD_VIDEO";
const REMOVE_VIDEO = "playlists/REMOVE_VIDEO";

//
//  Initial State
//

const initialState = {
	main: {
		name: "Main",
		items: []
	}
};

//
// Reducer
//
export default function player(state = initialState, action = {}) {
	let newLists;
	switch (action.type) {
		case ADD_VIDEO:
			newLists = { ...state };
			newLists[action.playlistId] = {
				...newLists[action.playlistId],
				items: [].concat(...newLists[action.playlistId].items, [action.video])
			};
			return newLists;

		case REMOVE_VIDEO:
			newLists = { ...state };
			let newItems = [].concat(...newLists[action.playlistId].items);
			// Remove the items
			newItems.splice(action.index, 1);
			newLists[action.playlistId] = {
				...newLists[action.playlistId],
				items: newItems
			};
			return newLists;

		default:
			return state;
	}
}

//
// Action Dispatchers
//

export function addVideoToPlaylist(playlistId, video) {
	return {
		type: ADD_VIDEO,
		playlistId,
		video
	};
}

export function removeVideoFromPlaylist(playlistId, index) {
	return {
		type: REMOVE_VIDEO,
		playlistId,
		index
	};
}
