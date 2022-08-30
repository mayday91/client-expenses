import IndexExpenses from './expenses/IndexExpenses'
import MyPieChart from './pie-chart/PieChart'
import './Home.css'

const Home = (props) => {
	const { msgAlert, user, expenses } = props
	console.log('props in home', props)

	return (
		<div className='home'>
			<MyPieChart user={user} expenses={expenses}  />
			<IndexExpenses msgAlert={msgAlert} />
		</div>
	)
}

export default Home
