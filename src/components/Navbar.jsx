import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/Authcontext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#" onClick={logout}>Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/log-in">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
