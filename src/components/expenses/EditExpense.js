import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ExpenseForm from './ExpenseForm'
import { updateReviewSuccess, updateReviewFailure } from  '../shared/AutoDismissAlert/messages'

const EditExpenseModal = (props) => {
  const { user, show, handleClose, updateExpense, msgAlert, triggerRefresh } = props
  const [expense, setExpense] = useState(props.expense)

  const handleChange = (e) => {
    setExpense(prevExpense => {
      let updatedValue = e.target.value
      const updatedName = e.target.name

      console.log('this is the input type', e.target.type)

      const updatedExpense = {
        [updatedName]: updatedValue
      }
      return {
        ...prevExpense,
        ...updatedExpense
      }
    })
  }
 
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('expense in edit', expense)
    updateExpense(user, expense)
    // if we're successful in modal we want modal to close
      .then(() => handleClose())
      .then(() => triggerRefresh())
        .catch(err => console.log(err))
  }

  return (
      <Modal  className='signInForm' show={show} onHide={handleClose}>
        <Modal.Header closeButton />

        
        <Modal.Body>
          <ExpenseForm 
            expense={expense}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading='Update Expense'
          />
        </Modal.Body>
      </Modal>
    )
}

export default EditExpenseModal