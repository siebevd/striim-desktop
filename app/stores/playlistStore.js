import { observable, action, toJS, reaction, computed } from "mobx";

class PlaylistStore {
	constructor(initObj) {
		if (initObj && initObj.list) {
			// the list is set in the initing object
			// this probably means all the other stuff is set as well
			// as this is coming from localstorage
			this.list = initObj.list;
			this.activeIndex = initObj.activeIndex || 0;
		}
	}

	@observable list = [];
	@observable activeIndex = 0;

	@action
	addItem({ id, title, thumb, artist, type }) {
		// TODO: should we validate that it
		// has all the correct items?
		this.list.push({
			id,
			title,
			thumb,
			artist,
			type
		});
	}

	@computed
	get activeItem() {
		return this.list[this.activeIndex];
	}

	@action
	removeItemByIndex(index) {
		// TODO: should this be written smarter?
		// (maybe we can write a function that removes it based on the youtube id? - but what happens if the same id is in the list twice?)
		// Remove the item from the list
		this.list.splice(index, 1);
	}

	subscribeLocalstorageToStore() {
		// Sync the whole store with localstorage
		reaction(
			() => toJS(this),
			list => localStorage.setItem("playlist", JSON.stringify(list))
		);
	}
}

export default PlaylistStore;
