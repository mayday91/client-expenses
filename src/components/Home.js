import IndexExpenses from './expenses/IndexExpenses'

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<IndexExpenses msgAlert={msgAlert} user={user} />
		</>
	)
}

export default Home
