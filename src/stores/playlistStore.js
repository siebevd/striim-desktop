import { observable, action, toJS, reaction, computed } from "mobx";
import searchStore from "stores/searchStore";

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

	@computed
	get activeItem() {
		// A bit stupid, since this line is not being used
		// but if it's not there, then mobx doesn't recognice that the list
		// is being used in the computed value, so doesn't rerender...
		const listLength = this.list.length;
		let activeItem = this.list[this.activeIndex];

		if (!activeItem && listLength > 0) {
			// If there is no active item, but there are items in the list
			// automatically assign the first one
			activeItem = this.list[0];
		}

		return activeItem || null;
	}

	/**
	 * Actions
	 */

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

		// Reset the search
		searchStore.resetList();
	}

	@action
	removeItemByIndex(index) {
		// TODO: should this be written smarter?
		// (maybe we can write a function that removes it based on the youtube id? - but what happens if the same id is in the list twice?)
		// Remove the item from the list

		// Check if we're not removing the current active item
		if (index === this.activeIndex) {
			// Make the previous video the active one instead
			this.activeIndex = index - 1;
		}
		this.list.splice(index, 1);
	}

	@action
	setActiveItem(index) {
		this.activeIndex = index;
	}

	@action
	goToNextActiveItem() {
		if (this.activeIndex < this.list.length - 1) {
			// Only go to next video if we aren't on the last video
			this.activeIndex = this.activeIndex + 1;
		}
	}

	@action
	goToPrevActiveItem() {
		if (this.activeIndex > 0) {
			// Only go to next video if we aren't on the first
			this.activeIndex = this.activeIndex - 1;
		}
	}

	subscribeLocalstorageToStore() {
		// Sync the whole store with localstorage
		reaction(
			() => toJS(this),
			list => localStorage.setItem("playlist", JSON.stringify(list))
		);
	}
}

const playlistStore = new PlaylistStore(
	JSON.parse(localStorage.getItem("playlist") || "{}")
);

export default playlistStore;
