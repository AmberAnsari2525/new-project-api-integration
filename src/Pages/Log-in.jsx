import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../Context/Authcontext'
import { Loginuser } from '../Services/api';

export const Login = () => {
    const { login } = useContext(AuthContext); // Access login function from AuthContext


    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            console.log("Sending request with data:", userData);
            const response = await Loginuser(userData);
            console.log("Response received:", response);
            if (response && response.token) {
                console.log("Login successful, token:", response.token);
                login(response.token);
            } else if (response.error) {
                console.error("API returned an error:", response.error);
                setError(response.error);
            } else {
                console.log("Unexpected response format:", response);
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                console.error("Invalid credentials:", err.response.data);
                setError("Invalid email or password. Please try again.");
            } else {
                console.error("An unexpected error occurred:", err);
                setError("An unexpected error occurred. Please try again later.");
            }
            console.log("user login failed", err);
        }
    }
        
    return (
        <div>
            <div className='container'>
                <div className='row'>

                    <div className='col-lg-6'>
                        <h1>Login</h1>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <input
                                    placeholder='Email'
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail"
                                    aria-describedby="emailHelp"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    placeholder='Password'
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword"
                                    onChange={handleChange}
                                />
                            </div>
                            <b>
                                <span className="text-decoration-none d-inline-block mb-3">Have no account? </span>
                                <Link to="/" className="text-decoration-none">Sign Up</Link>
                            </b>              <br />
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className='col-lg-6'>
                    </div>
                </div>
            </div>
        </div>
    )
}
