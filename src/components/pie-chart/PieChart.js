import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import './PieChart.css'
// import { getAllExpenses } from '../../api/expenses'
import { messages } from '../shared/AutoDismissAlert/messages'
import IndexExpenses from '../expenses/IndexExpenses';
import apiUrl from '../../apiConfig'
import axios from 'axios'


ChartJS.register(ArcElement, Tooltip, Legend);

const MyPieChart = (props) => {
  const [expenses, setExpenses] = useState()
  const { cats } = props
  const getAllExpenses = () => {
    return axios(`${apiUrl}/expenses`)
  }
  useEffect(() => {
    getAllExpenses()
    .then(res => setExpenses(res.data.expenses))
    .catch(err => console.log(err, 'error in getting expenses for pie chart'))
  }, [])
  // const expenseCards = expenses.map(expense => ()
  // map over categories
  // set new state variable inside .map
  // set to array of strings
  // need spread operator ...
  // for data map over amount
  // set new state variables
  // set to array of numbers


  // const data1 = expenses[0].amount
  // const data2 = expenses[1].amount

  const data = {
    labels: ['Bills','Groceries', 'Entertainment', 'Clothes', 'Shoes'],
    datasets: [
      {
        label: 'Expenses',
        data: [180, 20, 34, 45],
        backgroundColor: [
          'rgba(237, 73, 134, 0.4)',
          'rgba(194, 8, 137, 0.4)',
          'rgba(176, 73, 237, 0.4)',
          'rgba(135, 84, 168, 0.4)',
          'rgba(184, 35, 164, 0.4)',
          'rgba(129, 35, 184, 0.4)',
        ],
        borderColor: [
          'rgba(35, 192, 192, 1)',
          'rgba(194, 8, 137, 1)',
          'rgba(176, 73, 237, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(35, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 5
      },
    ],
  }
    console.log('data in pie chart', data)
    console.log('expenses in pie chart', expenses)
    
  return (
    
      <div className="pie-chart">
        <h1 className='pie-chart-title'>Your Spending Habits</h1>
        <Doughnut data={data} {...props}/>
      </div>
      
    
    )
}
export default MyPieChart