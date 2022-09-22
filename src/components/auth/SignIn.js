import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import './Auth.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    // const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const {  setUser } = props

        const credentials = { username, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() => navigate('/'))
			.catch((error) => {
                setUsername('')
                setPassword('')
			})
	}

    return (
        <div className='signIn'>
            <div className=''>
                <h3>Sign In</h3>
                <br></br>
                <Form className='signInForm' onSubmit={onSignIn}>
                    <Form.Group controlId='username'>
                        <Form.Label><h4>Username</h4></Form.Label>
                        <Form.Control
                            type='username'
                            name='username'
                            value={username}
                            placeholder='Enter username'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <br></br>
                    {/* <h4>OR...</h4>
                    <br></br>
                    <Form.Group controlId='email'>
                        <Form.Label><h4>Email Address</h4></Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email address'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group> */}
                    <br></br>
                    <Form.Group controlId='password'>
                        <Form.Label><h4>Password</h4></Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
