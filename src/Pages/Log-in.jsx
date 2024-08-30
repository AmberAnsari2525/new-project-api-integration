import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../Context/Authcontext';
import { Loginuser } from '../Services/api';

export const Login = () => {
    const { login } = useContext(AuthContext); // Access login function from AuthContext

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null); // Error for form validation

    // Handle input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setFormError(null); // Reset form error on input change
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null); // Reset form error on submission

        // Validate email and password
        if (!userData.email || !userData.password) {
            setFormError("Email and password are required.");
            return;
        }

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
        } finally {
            setLoading(false); // Ensure loading state is turned off after completion
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div>
                        <div className="card-header text-center">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-start d-block">Email:</label>
                                    <input
                                        type="email"
                                        className={`form-control ${formError ? 'is-invalid' : ''}`}
                                        id="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pwd" className="form-label text-start d-block">Password:</label>
                                    <input
                                        type="password"
                                        className={`form-control ${formError ? 'is-invalid' : ''}`}
                                        id="pwd"
                                        placeholder="Enter password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                {formError && <div className="alert alert-danger">{formError}</div>}
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            {' '}Signing In...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </form>
                            <b>
                                <span className="text-decoration-none d-inline-block mb-3">Have no account? </span>
                                <Link to="/" className="text-decoration-none">Sign Up</Link>
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
