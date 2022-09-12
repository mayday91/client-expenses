import ExpenseForm from "./ExpenseForm";
import { createExpense } from "../../api/expenses"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createExpenseSuccess, createExpenseFailure } from  '../shared/AutoDismissAlert/messages'
import { SettingsOverscanOutlined } from "@material-ui/icons";

const CreateExpense = (props) => {
  console.log('these are the props in Create Expense', props)
  const { user, msgAlert } = props
  const navigate = useNavigate()
  const [expense, setExpense] = useState({
    title: '',
    category: '',
    amount: '',
  })

  console.log('this is expense in createExpense', expense)

 const handleRefresh = () => {
  setExpense({})
}

  const handleChange = (e) => {
    setExpense(prevExpense => {
      let updatedValue = e.target.value
      let updatedTitle = e.target.title
      const updatedName = e.target.name

      console.log('this is the input type', e.target.type)

      if(e.target.type === 'number'){
        // this is looking at input type and changing it from default, which is a string, into an actual number
        updatedValue = parseInt(e.target.value)
      }
      
      const updatedExpense = {
        [updatedName]: updatedValue,
        [updatedTitle]: updatedValue
      }
      return {
        ...prevExpense,
        ...updatedExpense
      }
    })
  }
  // add handleSubmit here that makes API request and handles the response
  const handleSubmit = (e) => {
    e.preventDefault()
    
    createExpense(user, expense)
    // if we're successful, navigate to show page for new pet
    // send success message to user
      .then(navigate(`/`))
      .then(() => {
        msgAlert({
          heading: 'Oh Yeah!',
          message: createExpenseSuccess,
          variant: 'success'
        })
      })
    // if error tell user
      .catch(() => 
        msgAlert({
          heading: 'Oh No!',
          message: createExpenseFailure,
          variant: 'danger'
        })
      )
  }

  return <ExpenseForm 
  expense={ expense } 
  handleChange={ handleChange }
  handleSubmit={ handleSubmit }
  handleRefresh={ handleRefresh }
  heading='Add an expense.'
  />
}

export default CreateExpense