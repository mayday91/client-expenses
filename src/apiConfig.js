let apiUrl
const apiUrls = {
    // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
	production: 'https://mayday-proxy.herokuapp.com/https://expenses-server.up.railway.app',
	development: 'http://localhost:3001',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
