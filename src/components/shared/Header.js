import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import './Header.css'

// const authenticatedOptions = (
// 	<>
// 		<Nav.Item>

// 			<Link to='change-password' style={linkStyle}>
// 				Change Password
// 			</Link>
// 		{/* </Nav.Item>
// 		<Nav.Item> */}
// 			<Link to='sign-out' style={linkStyle}>
// 				Sign Out
// 			</Link>
// 		</Nav.Item>
// 	</>
// )

// const unauthenticatedOptions = (
// 	<>
//         <Nav.Item>
// 		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
//         </Nav.Item>
//         <Nav.Item>
// 		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
//         </Nav.Item>
// 	</>
// )

// const alwaysOptions = (
// 	<>
// 		<Nav.Item>

// 		</Nav.Item>
// 	</>
// )

const linkStyle = {
		color: '#95e8d7',
		textDecoration: 'none',
		padding: '10px',
		fontWeight: 'bold',
		fontFamily: 'Trebuchet',
}

const Header = ({ user }) => (
	<Navbar className='headerNavBar navBar navbar navbar-fixed-top'>
		<Navbar.Brand >
      <Link to='/' style={linkStyle}>
				Pecunia
			</Link>
				{user && (
					<Link to='/accounts' style={linkStyle}className='username'> {user.username} </Link>
				)}
    </Navbar.Brand>
	</Navbar>
)

export default Header
