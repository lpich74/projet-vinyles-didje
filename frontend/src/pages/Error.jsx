import { Link } from 'react-router-dom'
import '../styles/Error.css'

function Error() {
    return (
      <div className="error-global">
        <div className='error-main'>
          <h1 className='error-404'>404</h1>
          <span className='error-message'>Oups! La page que vous avez demandé n'existe pas.</span>
        </div>
        <Link className='error-back' to="/">Retourner sur la page d'accueil</Link>
      </div>
    )
  }
  
  export default Error