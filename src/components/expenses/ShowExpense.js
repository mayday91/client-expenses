import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card } from 'react-bootstrap'
import { Button, ButtonGroup } from '@mui/material'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneExpense, updateExpense, removeExpense } from '../../api/expenses'
import EditExpenseModal from './EditExpense'
import IndexExpenses from './IndexExpenses'
import NewNoteModal from '../notes/NewNote'
import ShowNote from '../notes/ShowNote'
import './ShowExpense.css'
import Home from '../Home.js'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'row wrap',
    padding: '10px',
}

const expenseClass = {
    textAlign: "center",
    backgroundColor: "lightCoral",
    fontSize: "30px",
    fontFamily: "Times",
    width: "fit-content",
    color: ""
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
    // const [user, setUser] = useState(null)
    
//     if (expense.type === 'income'){
//       const className = incomeClass
//   } else {
//       const className = expenseClass
//   }


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
            .catch(err => console.log('error in show expense', err))
            .catch()
    }, [updated, id])

    
    const removeTheExpense = () => {
        console.log('in removeTheExpense', expense)
        console.log('is this the id I need?', id)
        removeExpense(user, expense._id)
            .then(() => {navigate('/expenses')})
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


  // const className = expense.type === 'income' ? expenseCard : incomeCard
  

    return (
        <div className='showExpense'>
                <Container style={cardContainerLayout}>
                <Card style={expenseClass}>
                    <Card.Header>{ expense.title }<br></br>${ expense.amount }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Category [ { expense.category } ]</small><br></br>Tracked by [ { expense.userName } ]</div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <ButtonGroup 
                                className="buttonGroup" variant="contained" aria-label="outlined primary button group">
                        <Button  onClick={() => setNoteModalShow(true)}
                             variant="dark"
                        >
                            Leave A Note
                        </Button>
                        </ButtonGroup>
                        {
                            // expense.owner && user && expense.owner._id === user.id 
                            user && user.username === expense.userName
                            ?
                            <div className="buttons">
                                <ButtonGroup 
                                className="buttonGroup" variant="contained" aria-label="outlined primary button group">
                                <Button onClick={() => setEditModalShow(true)} 
                                    variant="warning"
                                >
                                    Edit
                                </Button>
                                
                                <Button onClick={() => removeTheExpense()}
                                    variant="danger"
                                >
                                    Delete
                                </Button>
                                </ButtonGroup>
                            </div>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                <div class='noteCards'>{noteCards}</div>
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