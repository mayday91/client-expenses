import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditNoteModal from './EditNote'
import { deleteNote } from '../../api/notes'

const ShowNote = (props) => {
    const { note, expense, user, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)

    // calls this to destroy a note
    const destroyNote = () => {
        deleteNote(user, expense._id, note._id)
            .then(() => 
                msgAlert({
                    heading: 'Note Deleted',
                    message: 'Bye note!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <Card className="m-2">
                <Card.Header>{note.userName}</Card.Header>
                <Card.Body>
                    <small>{note.body}</small><br/>

                </Card.Body>
                <Card.Footer>
                    {
                        user && user.email === note.userName
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Note
                            </Button>
                            <Button 
                                onClick={() => destroyNote()} 
                                variant="danger"
                            >
                                Delete Note
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