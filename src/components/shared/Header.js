import React from 'react'
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
		<Nav.Item>
		<Link to='/addExpense' style={linkStyle}>
				Add Expenses
			</Link>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		{/* </Nav.Item>
		<Nav.Item> */}
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='dark' variant='light' expand='md'>
		<Navbar.Brand>
      <Link to='/' style={linkStyle}>
				eXpense
			</Link>
				{user && (
					<span className='username'>Welcome {user.username} !</span>
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
