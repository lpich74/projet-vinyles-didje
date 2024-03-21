import '../styles/Header.css';
import { Link, useLocation } from 'react-router-dom'
import { isUserConnected } from '../functions/Functions';
import HeaderLogo from '../assets/record-logo.png';

function Header() {
    const location = useLocation();

    const deleteToken = () => {
        const confirmation = window.confirm("Êtes-vous sûr de bien vouloir vous déconnecter ?");

        if (confirmation) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    };

    return (
        <header className='header-global'>
            <div className='logo-title'>
                <img src={HeaderLogo} alt='record logo' height={80} width={80} />
                <h1>Les Vinyles de Didje</h1>
            </div>
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
                <a href='mailto:didierpichollet@free.fr' className={`header-link`}>
                    Contact
                </a>
                {isUserConnected() &&
                    <Link className={`header-link disconnect`} onClick={deleteToken}>
                        Déconnexion
                    </Link>
                }
            </nav>
      </header>
    )
}

export default Header