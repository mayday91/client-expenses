import { 
  Form,
  Button, 
  Container
} from 'react-bootstrap'

const ExpenseForm = (props) => {
  const { expense, handleChange, heading, handleSubmit } = props
  return (
    <Container className='justify-content-center'>
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="title">Title:</Form.Label>
        <Form.Control
          placeholder="What is the expense?"
          name="title"
          id="title"
          value={ expense.title }
          onChange={ handleChange }
        />
        <Form.Label htmlFor="amount">Amount:</Form.Label>
        <Form.Control
          placeholder="Amount?"
          name="amount"
          id="amount"
          value={ expense.amount}
          onChange={ handleChange }
        />
        <Form.Label htmlFor="category">Category:</Form.Label>
        <Form.Control
          placeholder="What category is this in?"
          name="category"
          id="category"
          value={ expense.category }
          onChange={ handleChange }
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default ExpenseForm