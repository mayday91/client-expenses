import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllExpenses } from '../../api/expenses'
import './IndexExpenses.css'
import { Card } from 'react-bootstrap'

//style for our card container
const cardContainerStyle = {
  display: 'grid',
  // flexFlow: 'row wrap',
  justifyContent: 'center',
  padding: '10px',
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
  const [error] = useState(false)
  

  console.log(props)
useEffect(() => {
  getAllExpenses()
  .then(res => setExpenses(res.data.expenses))
  .catch(err => console.log(err))
}, [])



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
    <div className='yourExpenses'>
        
      <div>
        <br></br>
        { expenseCards }
      </div>
    </div>
    )
}

export default IndexExpenses