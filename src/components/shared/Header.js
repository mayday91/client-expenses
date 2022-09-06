import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import './Header.css'

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
		padding: '5px',
}
const authenticatedOptions = (
	<>
		<Nav.Link>
		<Link to='/addExpense' style={linkStyle}>
				Add Expenses
			</Link>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		{/* </Nav.Link>
		<Nav.Link> */}
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='dark' variant='light' expand='md'>
		<Navbar.Brand>
      <Link to='/' style={linkStyle}>
				eXpense
			</Link>
				{user && (
					<span className='navbar-text welcome-user mr-2'>Welcome, {user.email}</span>
				)}
    </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
