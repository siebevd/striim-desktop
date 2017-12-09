import { observable, action, toJS, reaction } from 'mobx';


class PlaylistStore {

	constructor(initObj){

		if (initObj && initObj.list) {
			// the list is set in the initing object
			// this probably means all the other stuff is set as well
			// as this is coming from localstorage
			this.list = initObj.list;
			this.activeItem = initObj.activeItem;
		}
	}

	@observable list = [];
	@observable activeItem = '';

	@action addItem(id) {
		this.list.push({name:id});
	}

	subscribeLocalstorageToStore(){
		reaction(
			() => toJS(this),
			list => localStorage.setItem('playlist', JSON.stringify(list))
		);
	}


}

export default PlaylistStore;
