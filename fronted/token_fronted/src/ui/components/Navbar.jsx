import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';


export const Navbar = () => {

    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout()
        navigate('/auth', {
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Token App
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link  ${ isActive ? 'active':'' }` }
                        to="/"
                    >
                        Token
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item w-250 nav-link  ${ isActive ? 'active':'' }` }
                        to="/tokenUsage"
                    >
                        Uso
                    </NavLink>
    
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <button
                        className="nav-item nav-link btn"
                        onClick={ onLogout }
                    >
                        Salir
                    </button>

                </ul>
            </div>
        </nav>
    )
}