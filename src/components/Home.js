import IndexExpenses from './expenses/IndexExpenses'
import MyPieChart from './pie-chart/PieChart'
import './Home.css'
import React, { useMediaQuery } from 'react'



const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', msgAlert)

	
	return (
		<div className='homeItems'>
			<div className="pieChart">
			<MyPieChart user={user}/>
			</div>
			<div className="indexExpenses">
			<IndexExpenses msgAlert={msgAlert} user={user} />
			</div>
		</div>
	)
}
 
export default Home
