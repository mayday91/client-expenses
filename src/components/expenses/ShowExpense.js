import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneExpense, updateExpense, removeExpense } from '../../api/expenses'
import messages from '../shared/AutoDismissAlert/messages'
import EditExpenseModal from './EditExpense'
import NewNoteModal from '../notes/NewNote'
import ShowNote from '../notes/ShowNote'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap',
    margin: '10px',
    padding: '20px',
    border: '5px solid darkgrey'
}

const expenseCard = {
    textAlign: "center",
    backgroundColor: "black",
    fontSize: "30px",
    fontFamily: "Times",
    width: "fit-content",
    color: "skyblue"
}


const ShowExpense = (props) => {
    const [expense, setExpense] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [noteModalShow, setNoteModalShow] = useState(false)
    const [updated, setUpdated] = useState(null)

    const {id} = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the expense in showExpense', expense)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneExpense(id)
            .then(res => setExpense(res.data.expense))
            .catch(err => console.log(err))
    }, [updated, id])

    
    const removeTheExpense = () => {
        console.log('in removeTheExpense', expense)
        console.log('is this the id I need?', id)
        removeExpense(user, expense._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeReviewSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing expense',
                    message: messages.removeReviewFailure,
                    variant: 'danger'
                })
            })
    }
    let noteCards
    if (expense) {
        if (expense.notes.length > 0) {
            noteCards = expense.notes.map(note => (
                <ShowNote 
                    style={expenseCard}
                    key={note._id}
                    note={note}
                    expense={expense}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!expense) {
        return <LoadingScreen />
    }

    return (
        <div>
            <Container style={cardContainerLayout}>
                <Card style={expenseCard}>
                    <Card.Header>{ expense.title }<br></br>{ expense.amount }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>{ expense.category }</small><br></br>Tracked by: { expense.userName }</div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setNoteModalShow(true)}
                            className="m-2" variant="dark"
                        >
                            Leave a note on {expense.title} !
                        </Button>
                        {
                            // expense.owner && user && expense.owner._id === user.id 
                            user && user.email === expense.userName
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Expense
                                </Button>
                                
                                <Button onClick={() => removeTheExpense()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Delete Expense
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                <div style={expenseCard}>{noteCards}</div>
            </Container>
            <EditExpenseModal 
                user={user}
                expense={expense} 
                show={editModalShow} 
                updateExpense={updateExpense}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewNoteModal 
                expense={expense}
                show={noteModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setNoteModalShow(false)} 
            />
        </div>
    )
}

export default ShowExpense