import '../styles/Header.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { isUserConnected } from '../functions/Functions';
import { CiMenuBurger } from "react-icons/ci";
import HeaderLogo from '../assets/record-logo.png';

function Header() {
    const location = useLocation();
    const menuRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const deleteToken = () => {
        const confirmation = window.confirm("Êtes-vous sûr de bien vouloir vous déconnecter ?");

        if (confirmation) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className='header-global'>
            <div className='logo-title'>
                <img src={HeaderLogo} alt='record logo' height={80} width={80} />
                <h1>Les Vinyles de Didje</h1>
            </div>
            <nav className='menu-icon' onClick={toggleMenu}>
                <CiMenuBurger />
                {menuOpen &&
                    <table className="menu-links" ref={menuRef}>
                        <tbody>
                            <tr>
                                <Link to="/" className={`menu-header-link ${location.pathname === '/' && 'active'}`}>
                                    Accueil
                                </Link>
                            </tr>
                            <tr>
                                <Link to="/mes-vinyles" className={`menu-header-link ${location.pathname === '/mes-vinyles' && 'active'}`}>
                                    Mes Vinyles
                                </Link>
                            </tr>
                            <tr>
                                <Link to="/ajouter-un-disque" className={`menu-header-link ${location.pathname === '/ajouter-un-disque' && 'active'}`}>
                                    Ajouter un Disque
                                </Link>
                            </tr>
                            <tr>
                                <a href='mailto:didierpichollet@free.fr' className={`menu-header-link`}>
                                    Contact
                                </a>
                            </tr>
                            {isUserConnected() &&
                                <tr>
                                    <Link className={`menu-header-link disconnect`} onClick={deleteToken}>
                                        Déconnexion
                                    </Link>
                                </tr>
                            }
                        </tbody>
                    </table>
                }
            </nav>
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