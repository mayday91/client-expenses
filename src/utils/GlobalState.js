import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'
import apiUrl from '../apiConfig'
import { configure } from '@testing-library/react'


const initialState = {
  expenses: [],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState)

// Create Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  
  // Actions
  async function getAllExpenses() {
    try {
      const res = await axios.get(`${apiUrl}/expenses`)

      dispatch({
        type: 'GET_EXPENSES',
        payload: res.data.expenses
      })

    } catch (error) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: error.response.data.error
      })
    }
  }

  async function deleteExpense(user, expenseId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${user.token}`
      }
    }
    try {
      await axios.delete(`${apiUrl}/expenses/${expenseId}`, user, config)

      dispatch({
        type: 'DELETE_EXPENSE',
        payload: expenseId
      })
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error
      })
    }
  }

  async function createExpense(user, newExpense) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${user.token}`
      }
    }

    try {
      const res = await axios.post(`${apiUrl}/expenses`, newExpense, user, config);

      dispatch({
        type: 'ADD_EXPENSE',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }
  return (
  <GlobalContext.Provider value={{
    expenses: state.expenses,
    error: state.error,
    loading: state.loading,
    deleteExpense,
    createExpense,
    getAllExpenses
  }}>
    { children }
  </GlobalContext.Provider>)
}