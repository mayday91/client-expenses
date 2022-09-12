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
         <Form.Label htmlFor="type">Type:</Form.Label>
        <Form.Select 
        aria-label="type"
        name='type'
        defaultValue={expense.type}
        onChange={ handleChange }
      >
        <option>Income or Expense:</option>
        <option value='income'>Income</option>
        <option value='expense'>Expense</option>
      </Form.Select>
        <Form.Label htmlFor="category">Category:</Form.Label>
        <Form.Select 
        aria-label="category"
        name='category'
        defaultValue={expense.category}
        onChange={ handleChange }
      >
        <option>Pick a category:</option>
        <option value='utilities'>Utilities</option>
        <option value='housing'>Housing</option>
        <option value='ent'>Entertainment</option>
        <option value='food'>Food</option>
        <option value='travel'>Travel</option>
        <option value='savings'>Savings</option>
        <option value='investment'>Investment</option>
        <option value='loan'>Loan</option>
        <option value='personal'>Personal</option>
        <option value='healthcare'>Healthcare</option>
        <option value='debt'>Debt</option>
        <option value='credit'>Credit</option>
        <option value='tech'>Tech</option>
        <option value='misc.'>Miscellaneous</option>
      </Form.Select>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default ExpenseForm