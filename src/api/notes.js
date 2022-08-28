import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createNote = (user, expenseId, newNote) => {
  console.log('this is the new toy in createNote', newNote)
  console.log('this is user in createNote', user)
	return axios({
		url: `${apiUrl}/notes/${expenseId}`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			note: newNote,
		},
	})
}

// UPDATE
export const updateNote = (user, expenseId, updatedNote) => {
  console.log('this is updatedNote', updatedNote)
  console.log('this is user in updatedNote', user)
	return axios({
		url: `${apiUrl}/notes/${expenseId}/${updatedNote.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			note: updatedNote,
		},
	})
}

// DELETE
export const deleteNote = (user, expenseId, noteId) => {
	return axios({
		url: `${apiUrl}/notes/${expenseId}/${noteId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}