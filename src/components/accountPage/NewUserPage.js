import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import './AccountPage.css'

const linkStyle = {
    color: '#95e8d7',
    textDecoration: 'none',
		padding: '5px',
}


const unauthenticatedOptions = (
	<div className='accountOptions'>
		<h2>Have an account?</h2>
		<Link to='accounts/sign-in' style={linkStyle}>Sign In
		</Link><br></br>
		<br></br>
		<h2>Need to make one?</h2>
		<Link to='accounts/sign-up' style={linkStyle}>Sign Up
		</Link>
	</div>
)



const NewUser = () => (
	<>
		 { unauthenticatedOptions }
  </>
)

export default NewUser