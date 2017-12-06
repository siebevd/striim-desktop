import { observable, action, computed } from 'mobx';
import { searchYT } from 'utils/youtubeApi.js';

class SearchStore {

	@observable loading = false;
	@observable results = [];

	@action newSearch(query) {
		// Start loading
		this.loading = true;
		// Search youtube for the needed items
		// TODO: Error handling
		searchYT(query)
			.then(action((data)=>{
				console.log('this is the response', data.items);
				// Loading finished
				this.loading = false;
				this.results.replace(data.items);
			}))
	}

}

export default new SearchStore();
