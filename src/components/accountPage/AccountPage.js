import {useEffect, useState} from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import './AccountPage.css'
import getAllExpenses from '../expenses/IndexExpenses'


const linkStyle = {
    color: '#95e8d7',
    textDecoration: 'none',
		padding: '5px',
}
const authenticatedOptions = (
<div>
	
	<div className='authOptions'>	
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
			<br></br>
			<br></br>
			<Link to='change-email' style={linkStyle}>
				Change Email Address
			</Link>
			<br></br>
			<br></br>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
	</div>
</div>
)

// const unauthenticatedOptions = (
// 	<div className='noAuthOptions'>
//         <h2>Have an account?</h2>
// 		    <Link to='accounts/sign-in' style={linkStyle}>Sign In
// 				</Link><br></br>
// 				<br></br>
// 				<h2>Need to make one?</h2>
// 		    <Link to='accounts/sign-up' style={linkStyle}>Sign Up
// 				</Link>
// 	</div>
// )

const alwaysOptions = (
	<div>
		<a href="/">Home</a>
	</div>
)

const AccountManage = ({ user, Expenses }) => {
	console.log('expenses', Expenses)

	// const [expenses, setExpenses] = useState(null)
  

  // useEffect(() => {
  //   getAllExpenses()
  //   .then(res => setExpenses(res.data.expenses))
  //   .catch(err => console.log(err))
  // }, [])

	return (
		<div className='accountOptions'>
			<h1>Account Settings</h1>
			<p>Username: {user.username}</p>
			Email Address: {user.email}
			<br></br>
			{/* {Expenses.length} */}
			
			<br></br>
			<br></br>
			{user ? authenticatedOptions : alwaysOptions}
				
		</div>
	)
}

export default AccountManage
