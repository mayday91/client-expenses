import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import './Footer.css'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import SettingsIcon from '@mui/icons-material/Settings';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import IndexExpenses from '../expenses/IndexExpenses'



 const linkStyle = {
  textDecoration: 'none',
  color: 'lightCoral',
}

const loggedIn = (
  <div>
  <Link to='/addExpense' className='addExpenseIcon' style={linkStyle}>
  <Fab color="primary" aria-label="add">
      <AddIcon />
  </Fab>
    </Link>
    <Link to='/expenses' className='expensesListIcon' >
  <Fab color="primary" aria-label="list">
      <ListIcon />
  </Fab>
    </Link>
    {/* <Link to='/accounts' className='accountIcon' >
  <Fab color="primary" aria-label="account">
      <SettingsIcon />
  </Fab>
    </Link> */}
    <Link to={{ pathname: '/chart' }} className='chartIcon' >
  <Fab color="primary" aria-label="chart">
      <DonutSmallIcon />
  </Fab>
    </Link>
  </div>
)

const notLoggedIn = (
  <div>
  <Link to='/about' className='aboutIcon' >
  <Fab color="primary" aria-label="list">
      <ListIcon />
  </Fab>
  </Link>
  </div>
)


const Footer = ({ user }) => (
  <>
    <Navbar>
      { user ? loggedIn : notLoggedIn }
    </Navbar>
  </>
)

export default Footer