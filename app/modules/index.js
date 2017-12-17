import { combineReducers } from "redux";
import player from "./player";
import playlists from "./playlists";

export default combineReducers({
	player,
	playlists
});
