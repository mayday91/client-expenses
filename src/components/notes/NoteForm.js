import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const NoteForm = (props) => {
  const {note, handleChange, handleSubmit, heading} = props

  return(
    <Container className='justify-content-center'>
    <h3>{heading}</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Label htmlFor="body">Note:</Form.Label>
      <Form.Control
        placeholder="Anything you need to know about this expense?"
        name="body"
        id="body"
        value={ note.body }
        onChange={ handleChange }
      />
      <Button type="submit">Submit</Button>
    </Form>
  </Container>
    )
}

export default NoteForm