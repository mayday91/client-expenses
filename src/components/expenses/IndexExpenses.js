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
  padding: '10px',
  flex: 0.6,
}

const expenseCard = {
  // flex: 0.6,
  textAlign: "center",
  backgroundColor: "rgba(155, 8, 194, 0.6)",
  color:'black',
  width: '300px', 
  margin: '10px',
  border: '5px solid rgba(155, 8, 194, 0.6)',
  borderRadius: '20px',
  textDecoration: 'none',
  linkColor: 'white'
}

const IndexExpenses = (props) => {
  const [expenses, setExpenses] = useState(null)
  const [error, setError] = useState(false)
  const { msgAlert } = props
  
  useEffect(() => {
    getAllExpenses()
    .then(res => setExpenses(res.data.expenses))
    .catch(err => {msgAlert ({
      heading: 'error getting expenses',
      message: messages.getExpensesFailure,
      variant: 'danger',
      })
    setError(true)
    })
  }, [msgAlert])


  if (error) {
    return <p>Error!</p>
  }

  // if Expenses havent been loaded yet, show loading message
  if (!expenses) {
    return <LoadingScreen />
  } else if (expenses.length === 0) {
    return <p>No expenses yet.</p>
  }

   const expenseCards = expenses.map(expense => (
      <Card style={expenseCard} key={ expense.id }>
        <Card.Header><a href={`/expenses/${expense._id}`}>{expense.title}</a></Card.Header>
        <Card.Body>
          <Card.Text>
            ${expense.amount}
            
          </Card.Text>
        </Card.Body>
      </Card>
    ))
  return (
    
      <div style={ cardContainerStyle }>
        <br></br>
        <h1 className='yourExpenses'>Your Expenses</h1>
        { expenseCards }
      </div>
     
    )
}

export default IndexExpenses