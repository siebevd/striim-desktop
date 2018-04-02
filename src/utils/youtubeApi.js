import CONFIG from "config.js";
const apiBase = `https://www.googleapis.com/youtube/v3`;

// export const getYTVideoDetails = (ytId) => {
//
// 	return fetch(`${apiBase}/videos?part=snippet&id=${ytId}&key=${CONFIG.google.apiKey}`)
// 		.then((res)=>res.json())
// 		.then((data)=>{
// 			if (data.items.length > 0) {
// 				return data.items[0].snippet;
// 			} else {
// 				return Promise.reject('no video found');
// 			}
// 		});
//
// };

export const searchYT = query => {
	return fetch(
		`${apiBase}/search?key=${
			CONFIG.google.apiKey
		}&type=video&maxResults=25&part=snippet&q=${query}`
	).then(res => res.json());
};
