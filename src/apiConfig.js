let apiUrl
const apiUrls = {
    // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
	production: 'https://cors-anywhere.herokuapp.com/https://expenses.fly.dev',
	development: 'http://localhost:3001',
}

// if (window.location.hostname === 'localhost') {
// 	apiUrl = apiUrls.development
// } else {
	apiUrl = apiUrls.production
// }

export default apiUrl
