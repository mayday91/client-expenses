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

const incomeCard = {
  // flex: 0.6,
  textAlign: "center",
  backgroundColor: "#61c0bf",
  color:'#2c786c',
  width: '300px', 
  margin: '10px',
  border: '5px solid #bbded6',
  borderRadius: '20px',
  boxShadow: '1px 2px 9px #B4AAB9',
  justifyContent: 'center'
}
const expenseCard = {
  // flex: 0.6,
  textAlign: "center",
  backgroundColor: "#ffb6b9",
  color:'#c54c82',
  width: '300px', 
  margin: '10px',
  border: '5px solid #fae3d9',
  borderRadius: '20px',
  height: 'fit-content',
  boxShadow: '1px 2px 9px #F4AAB9',
  justifyContent: 'center'
}

const incomeLinkStyle = {
  color: "#2c786c",
  textDecoration: "none"
}

const expenseLinkStyle = {
  color: "darkgrey",
  textDecoration: "none"
}

const amountStyle = {
  textAlign: 'right',
}

const IndexExpenses = (props) => {
  const [expenses, setExpenses] = useState(null)
  const [user, setUser] = useState(null)
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
    return <p>No expenses tracked yet. Add some with the plus sign!</p>
  }

  
  //   if (expense.type === 'income'){
  //     const className = incomeClass
  // } else {
  //     const className = expenseClass
  // }
  // const className = expense.type === 'income' ? expenseCard : incomeCard

  const expenseCards = expenses.map(expense => (
      <Card style={expense.type === 'income' ? incomeCard : expenseCard} key={expense._id}>
        <Card.Body>
        <p><Link style={incomeLinkStyle} to={`/expenses/${expense._id}`}>{expense.title}</Link> 
        <br></br>${expense.amount}
        <br></br>{expense.catergory}
        </p>
        </Card.Body>
      </Card>
    ))
  return (
    <div className='yourExpenses'>
          { expenseCards }
    </div>
    )
}

// if (user.username === expenses.userName) {
    // return (
      // expenses.map(expense => (
      //   <Card style={expenseCard} key={ expense._id }>
      //     <Card.Body>
      //     <Link style={linkStyle} to={`/expenses/${expense._id}`}>{expense.title}</Link>
      //       <Card.Text style={amountStyle}>
      //       ${expense.amount}
              
      //       </Card.Text>
      //     </Card.Body>
      //   </Card>
      // ))
      // <div className='yourExpenses'>
        
      {/* <div>
        <br></br>
        { expenseCards }
      </div>
    </div> 
    )
    } */}

// }

export default IndexExpenses