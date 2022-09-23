// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import ShowExpense from './components/expenses/ShowExpense'
import CreateExpense from './components/expenses/CreateExpense'
import PieChart from '../src/components/pie-chart/PieChart'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import IndexExpenses from './components/expenses/IndexExpenses'
import AccountPage from './components/accountPage/AccountPage'
import AboutPage from './components/shared/AboutPage'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route 
						path='/' 
						element={
						<RequireAuth>
						<Home user={user} />
						</RequireAuth>
						} 
					/>
					<Route 
						path='/expenses' 
						element={
						<RequireAuth>
						<IndexExpenses user={user}/>
						</RequireAuth>
						} 
					/>
					<Route 
						path='/about' 
						element={
						<AboutPage />
						} 
					/>
					<Route 
						path='/accounts' 
						element={
						<RequireAuth>
						<AccountPage user={user} />
						</RequireAuth>
						} 
					/>
					<Route 
						path='/chart' 
						element={
						<RequireAuth>
						<PieChart  user={user} />
						</RequireAuth>
						} 
					/>
					<Route
						path='/accounts/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />
						}
					/>
					<Route
						path='/accounts/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />
						}
					/>
          <Route
            path='/accounts/sign-out'
            element={
            <RequireAuth user={user}>
            <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
          	</RequireAuth>
            }
          />
          <Route
            path='/accounts/change-password'
            element={
            <RequireAuth user={user}>
            <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
						}
          />
          {/* <Route
            path='/accounts/change-email'
            element={
            <RequireAuth user={user}>
            <ChangeEmail msgAlert={msgAlert} user={user} />
            </RequireAuth>
						}
          /> */}
					<Route 
						path='/expenses/:id'
						element={ 
						<ShowExpense user={ user } /> 
						}
					/>
					<Route
						path='/addExpense'
						element={ 
						<RequireAuth user={user}>
						<CreateExpense msgAlert={ msgAlert } user={user} />
						</RequireAuth>
						}
					/>
				</Routes>
				<Footer user={user} />
				
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
