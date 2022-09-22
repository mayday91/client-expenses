import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import { changeEmail } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChangeEmail = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		oldPassword: '',
	// 		newPassword: '',
	// 	}
	// }
    const [oldEmail, setOldEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const navigate = useNavigate()

	const onChangeEmail = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props
    
    
    const emailAddresses = {oldEmail, newEmail}
    console.log('the user', user, 'email addys', emailAddresses)

		changeEmail(emailAddresses, user)
			.then(() =>
				msgAlert({
					heading: 'Change Email Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldEmail('')
                setNewEmail('')
				msgAlert({
					heading: 'Change Email Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}



    return (
        <div className='signIn'>
            <div >
                <h3>Change Email</h3>
                <Form className='signInForm' onSubmit={onChangeEmail}>
                    <Form.Group controlId='oldEmail'>
                        <Form.Label>Current Email Address</Form.Label>
                        <Form.Control
                            required
                            name='oldEmail'
                            value={oldEmail}
                            type='email'
                            placeholder='Current Email Address'
                            onChange={e => setOldEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='newEmail'>
                        <Form.Label>New Email Address</Form.Label>
                        <Form.Control
                            required
                            name='newEmail'
                            value={newEmail}
                            type='email'
                            placeholder='New Email Address'
                            onChange={e => setNewEmail(e.target.value)}
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

export default ChangeEmail