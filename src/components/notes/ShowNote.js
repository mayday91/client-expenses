import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import Button from '@mui/material/Button'
import EditNoteModal from './EditNote'
import { deleteNote } from '../../api/notes'

const ShowNote = (props) => {
    const { note, expense, user, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)

    // calls this to destroy a note
    const destroyNote = () => {
        deleteNote(user, expense._id, note._id)
            .then(() => triggerRefresh())
            .catch(err => console.log(err))
    }

    return (
        <>
            <Card className="m-2">
                <Card.Header>{user.username}</Card.Header>
                <Card.Body>
                    <small>{note.body}</small><br/>

                </Card.Body>
                <Card.Footer>
                    {
                        user && user.username === note.userName
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit
                            </Button>
                            <Button 
                                onClick={() => destroyNote()} 
                                variant="danger"
                            >
                                Delete
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditNoteModal
                user={user}
                expense={expense}
                note={note}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowNote