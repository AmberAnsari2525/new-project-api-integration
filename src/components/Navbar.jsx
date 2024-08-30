import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/Authcontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <div className="btn-group" >
                                <button style={{marginLeft: '20px'}}
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Amber Maria
                                </button>
                                <ul className="dropdown-menu container-fluid">
                                    <li>
                                        <Link className="dropdown-item" to="/order">Order</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/product-list">Product</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#" onClick={logout}>Logout</Link>
                                    </li>
                                </ul>
                            </div>
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
