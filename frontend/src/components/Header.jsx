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

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const deleteToken = () => {
        const confirmation = window.confirm("Êtes-vous sûr de bien vouloir vous déconnecter ?");

        if (confirmation) {
            localStorage.removeItem('token');
            window.location.href = '/#';
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) 
            && !event.target.closest('.menu-icon')) {
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
            <div className='menu'>
                <div className='menu-icon' onClick={toggleMenu}>
                    <CiMenuBurger className={menuOpen ? 'menu-icon-active' : ''} />
                </div>
                {menuOpen &&
                    <nav className={menuOpen ? 'menu-links show' : 'menu-links'} ref={menuRef}>
                        <Link to="/" onClick={closeMenu} className={`menu-header-link ${location.pathname === '/' && 'active'}`}>
                            Accueil
                        </Link>
                        <Link to="/mes-vinyles" onClick={closeMenu} className={`menu-header-link ${location.pathname === '/mes-vinyles' && 'active'}`}>
                            Mes Vinyles
                        </Link>
                        <Link to="/ajouter-un-disque" onClick={closeMenu} className={`menu-header-link ${location.pathname === '/ajouter-un-disque' && 'active'}`}>
                            Ajouter un Disque
                        </Link>
                        <a href='mailto:didierpichollet@free.fr' onClick={closeMenu} className={`menu-header-link ${isUserConnected() ? '' : 'contact'}`}>
                            Contact
                        </a>
                        {isUserConnected() &&
                            <Link className={`menu-header-link disconnect`} onClick={deleteToken}>
                                Déconnexion
                            </Link>
                        }
                    </nav>
                }
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