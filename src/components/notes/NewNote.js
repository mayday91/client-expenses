import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import NoteForm from './NoteForm'
import { createNote } from  '../../api/notes'

const NewNoteModal = (props) => {
  const { user, expense, show, handleClose, msgAlert, triggerRefresh } = props
  const [note, setNote] = useState({})

  const handleChange = (e) => {
    setNote(prevNote => {
      let value = e.target.value
      const name = e.target.name

      console.log('this is the input type', e.target.type)

      const updatedNote = {
        [name]: value
      }
      return {
        ...prevNote,
        ...updatedNote
      }
    })
  }
 
  const handleRefresh = () => {
    setNote({})
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    createNote(user, expense._id, note)
    // if we're successful in modal we want modal to close
    .then(() => handleClose())
    // if everything successful we need to trigger refresh for show page
    // changes to the updated boolean cause ShowReview's useEffect to run again
    .then(() => triggerRefresh())
    // if error tell user
      .catch(() => 
        msgAlert({
          heading: 'Oh No!',
          message: 'Something went wrong. Please try again',
          variant: 'danger'
        })
      )
  }

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />

        
        <Modal.Body>
          <NoteForm 
            note={note}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleRefresh={handleRefresh}
            heading='Leave a note!'
          />
        </Modal.Body>
      </Modal>
    )
}

export default NewNoteModal