import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/accounts/sign-up',
		data: {
			credentials: {
				username: credentials.username,
				email: credentials.email,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
		},
	})
}

export const signIn = (credentials) => {
	return axios({
		url: apiUrl + '/accounts/sign-in',
		method: 'POST',
		data: {
			credentials: {
				username: credentials.username,
				password: credentials.password,
			},
		},
	})
}

export const signOut = (user) => {
	return axios({
		url: apiUrl + '/accounts/sign-out',
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const changePassword = (passwords, user) => {
	return axios({
		url: apiUrl + '/accounts/change-password',
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		},
	})
}


// export const changeEmail = (email, user) => {
// 	return axios({
// 		url: apiUrl + '/accounts/change-email',
// 		method: 'PATCH',
// 		headers: {
// 			Authorization: `Token token=${user.token}`,
// 		},
// 		data: {
// 			email: {
// 				old: email.oldEmail,
// 				new: email.newEmail,
// 			},
// 		},
// 	})
// }
