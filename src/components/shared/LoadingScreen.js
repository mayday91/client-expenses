import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen = () => ( 
  <div style={{textAlign: 'center'}}>
    <Spinner role="status" animation="border">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
)


export default LoadingScreen
  
