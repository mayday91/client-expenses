import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllExpenses } from '../../api/expenses'
import { messages } from '../shared/AutoDismissAlert/messages'
import './IndexExpenses.css'
import { Card } from 'react-bootstrap'

//style for our card container
const cardContainerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  padding: '10px'
}

const expenseCard = {
  textAlign: "center",
  fontFace: "bold",
  backgroundColor: "darkblue",
  color:'grey',
  // width: '100%', 
  height: '180px',
  margin: '10px',
  border: '10px solid skyBlue',
  borderRadius: '100px',
}

const IndexExpenses = (props) => {
  const [expenses, setExpenses] = useState(null)
  const [error, setError] = useState(false)
  const { msgAlert } = props
  
  console.log(props)
useEffect(() => {
  getAllExpenses()
  .then(res => setExpenses(res.data.expenses))
  .catch(err => {msgAlert ({
    heading: 'error getting expenses',
    message: messages.getReviewsFailure,
    variant: 'danger',
    })
  setError(true)
  })
}, [])


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
      <Card style={expenseCard} key={ expense._id }>
        {/* <Card.Header></Card.Header> */}
        <Card.Body>
        {expense.title}
        <br></br>
          ${expense.amount}
          <Card.Text>
            <Link to={`/expenses/${expense._id}`}>View</Link><br></br>
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