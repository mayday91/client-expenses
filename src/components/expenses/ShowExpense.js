import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneExpense, updateExpense, removeExpense } from '../../api/expenses'
import EditExpenseModal from './EditExpense'
import NewNoteModal from '../notes/NewNote'
import ShowNote from '../notes/ShowNote'
import './ShowExpense.css'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'row wrap',
    margin: '10px',
}

const expenseClass = {
    textAlign: "center",
    backgroundColor: "red",
    fontSize: "30px",
    fontFamily: "Times",
    width: "fit-content",
    color: "skyblue"
}
const incomeClass = {
    textAlign: "center",
    backgroundColor: "green",
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

    const { user } = props
    console.log('user in props of showExpense', user)
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
            .then(() => {navigate('/')})
            .catch(err => console.log(err))
    }
    let noteCards
    if (expense) {
        if (expense.notes.length > 0) {
            noteCards = expense.notes.map(note => (
                <ShowNote 
                    style={expenseClass}
                    key={note._id}
                    note={note}
                    expense={expense}
                    user={user}
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
                <Card style={expenseClass}>
                    <Card.Header>{ expense.title }<br></br>${ expense.amount }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Category [ { expense.category } ]</small><br></br>Tracked by [ {  } ]</div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setNoteModalShow(true)}
                             variant="dark"
                        >
                            Leave A Note
                        </Button>
                        {
                            // expense.owner && user && expense.owner._id === user.id 
                            user && user.email === expense.userName
                            ?
                            <div className="buttons">
                                <Button onClick={() => setEditModalShow(true)} 
                                    variant="warning"
                                >
                                    Edit Expense
                                </Button>
                                
                                <Button onClick={() => removeTheExpense()}
                                    variant="danger"
                                >
                                    Delete Expense
                                </Button>
                            </div>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                <div style={expenseClass}>{noteCards}</div>
            </Container>
            <EditExpenseModal 
                user={user}
                expense={expense} 
                show={editModalShow} 
                updateExpense={updateExpense}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewNoteModal 
                expense={expense}
                show={noteModalShow}
                user={user}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setNoteModalShow(false)} 
            />
        </div>
    )
}

export default ShowExpense