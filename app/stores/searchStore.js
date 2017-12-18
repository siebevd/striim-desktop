import { observable, action, computed } from "mobx";
import { searchYT } from "utils/youtubeApi.js";

class SearchStore {
	@observable loading = false;
	@observable results = [];

	@action
	newSearch(query) {
		// Start loading
		this.loading = true;
		// Search youtube for the needed items
		// TODO: Error handling
		searchYT(query).then(
			action(data => {
				console.log("this is the response", data.items);
				// Make it a general format, so we can easily plugin
				// other sources in the future
				const newItems = data.items.map(item => ({
					id: item.id.videoId,
					title: item.snippet.title,
					thumb: item.snippet.thumbnails.default.url,
					artist: item.snippet.channelTitle,
					type: "youtube"
				}));
				// Loading finished
				this.loading = false;
				this.results.replace(newItems);
			})
		);
	}

	@action
	resetList() {
		this.results.replace([]);
	}
}

const searchStore = new SearchStore();

export default searchStore;
