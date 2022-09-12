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
  backgroundColor: "green",
  color:'black',
  width: '300px', 
  margin: '10px',
  border: '5px solid lightGreen',
  borderRadius: '20px',
}
const expenseCard = {
  // flex: 0.6,
  textAlign: "center",
  backgroundColor: "red",
  color:'black',
  width: '300px', 
  margin: '10px',
  border: '5px solid lightGreen',
  borderRadius: '20px',
}

const linkStyle = {
  color: "white",
  textDecoration: "none"
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

  
  //   if (expense.type === 'income'){
  //     const className = incomeClass
  // } else {
  //     const className = expenseClass
  // }
  // const className = expense.type === 'income' ? expenseCard : incomeCard

//   const expenseCards = expenses.map(expense => (
//       <Card style={className} key={ expense._id }>
//         {/* <Card.Header></Card.Header> */}

//         <Card.Body>
//         {expense.title}
//         <br></br>
//           ${expense.amount}
//           <Card.Text>
//             <Link style={linkStyle} to={`/expenses/${expense._id}`}>View</Link><br></br>
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     ))
//   return (
//     <div className='yourExpenses'>
        
//       <div>
//         <br></br>
//         { expenseCards }
//       </div>
//     </div>
//     )
// }


return (
  expenses.map(expense => (
    <Card style={expenseCard} key={ expense._id }>
      <Card.Body>
      {expense.title}
      <br></br>
        ${expense.amount}
        <Card.Text>
          <Link style={linkStyle} to={`/expenses/${expense._id}`}>View</Link><br></br>
        </Card.Text>
      </Card.Body>
    </Card>
  ))
  /* <div className='yourExpenses'>
    
  <div>
    <br></br>
    { expenseCards }
  </div>
</div> */
)
}



export default IndexExpenses