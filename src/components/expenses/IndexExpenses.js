import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllExpenses } from '../../api/expenses'
import { messages } from '../shared/AutoDismissAlert/messages'
import './IndexExpenses.css'

//style for our card container
const cardContainerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  padding: '10px'
}

const expenseCard = {
  textAlign: "center",
  backgroundColor: "darkblue",
  color:'grey',
  width: '30%', 
  margin: '10px',
  border: '20px solid skyBlue',
  borderRadius: '200px',
}

const IndexExpenses = (props) => {
  const [expenses, setExpenses] = useState(null)
  const [error, setError] = useState(false)
  const { msgAlert } = props
  
useEffect(() => {
  getAllExpenses()
  .then(res => setExpenses(res.data.expenses))
  .catch(err => {msgAlert ({
    heading: 'error getting reviews',
    message: messages.getReviewsFailure,
    variant: 'danger',
    })
  setError(true)
  })
}, [msgAlert])


  if (error) {
    return <p>Error!</p>
  }

  // if reviews havent been loaded yet, show loading message
  if (!expenses) {
    return <LoadingScreen />
  } else if (expenses.length === 0) {
    return <p>No expenses yet.</p>
  }

  const expenseCards = expenses.map(expense => (
      <Card style={expenseCard} key={ expense.id }>
        <Card.Header>{expense.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            <Link to={`/expenses/${expense._id}`}>Read it!</Link><br></br>
          </Card.Text>
        </Card.Body>
      </Card>
    ))
  return (
      <div style={ cardContainerStyle }>
        { expenseCards }
      </div>
    )
}

export default IndexExpenses