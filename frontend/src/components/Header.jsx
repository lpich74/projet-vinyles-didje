import '../styles/Header.css';
import { Link, useLocation } from 'react-router-dom'
import HeaderLogo from '../assets/record-logo.png';

function Header() {
    const location = useLocation();

    return (
        <header className='header-global'>
            <img src={HeaderLogo} alt='record logo' height={80} width={80} />
            <nav className='header-nav'>
                <Link to="/" className={`header-link ${location.pathname === '/' && 'active'}`}>
                    Accueil
                </Link>
                <Link to="/mes-vinyles" className={`header-link ${location.pathname === '/mes-vinyles' && 'active'}`}>
                    Mes Vinyles
                </Link>
                <Link to="/ajouter-un-disque" className={`header-link ${location.pathname === '/ajouter-un-disque' && 'active'}`}>
                    Ajouter un Disque
                </Link>
                <Link to="/contact" className={`header-link ${location.pathname === '/contact' && 'active'}`}>
                    Contact
                </Link>
            </nav>
      </header>
    )
}

export default Header