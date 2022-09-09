import IndexExpenses from './expenses/IndexExpenses'
import MyPieChart from './pie-chart/PieChart'
import './Home.css'

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', msgAlert)

	return (
		<div className='homeItems'>
			<MyPieChart user={user}/>
			<IndexExpenses msgAlert={msgAlert} user={user} />
		</div>
	)
}
 
export default Home
