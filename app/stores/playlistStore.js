import { observable, action } from 'mobx';


class PlaylistStore {

	@observable list = observable.map({
		// "test": {name:'hello'}
	});
	@observable activeItem = '';

	@action addItem(id) {
		this.list.set(id,{name:id})
	}
}

export default new PlaylistStore();
