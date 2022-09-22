// import IndexExpenses from './expenses/IndexExpenses'
import MyPieChart from './pie-chart/PieChart'
import './Home.css'
import React from 'react'
import NewUser from '../components/accountPage/NewUserPage'



const Home = (props) => {
	const { user } = props
	console.log('props in home')

	console.log('user?.username',user?.username)
	
	return (
		<>
		{ user?.username ? <MyPieChart /> : <NewUser />}
		</>	
	)
}
 
export default Home
