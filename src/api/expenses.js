import apiUrl from '../apiConfig'
import axios from 'axios'

// READ - INDEX
export const getAllExpenses = () => {
  return axios(`${apiUrl}/expenses`)
}

// READ - SHOW
export const getOneExpense = (id) => {
  return axios(`${apiUrl}/expenses/${id}`)
}

// CREATE
export const createExpense = (user, newExpense) => {
	return axios({
		url: apiUrl + '/expenses',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			expense: newExpense,
		},
	})
}

// UPDATE
export const updateExpense = (user, updatedExpense) => {
	return axios({
		url: `${apiUrl}/expenses/${updatedExpense.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			expense: updatedExpense,
		},
	})
}

// DELETE
export const removeExpense = (user, expenseId) => {
	return axios ({
		url: `${apiUrl}/expenses/${expenseId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`
		}
	})
}