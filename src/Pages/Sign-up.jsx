import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { registerUser } from '../Services/api';
import { AuthContext } from '../Context/Authcontext';

export const Signup = () => {
    const { signup } = useContext(AuthContext); // Access login function from AuthContext

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '', // Keep the dateOfBirth field but make it optional
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
    }); // Error for individual form fields
    const [successMessage, setSuccessMessage] = useState(''); // Add successMessage state

    // Handle input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setFormError({ ...formError, [e.target.name]: '' }); // Reset specific field error on input change
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newFormError = {};

        // Validate form fields
        if (!userData.name) {
            newFormError.name = "Name is required.";
            hasError = true;
        }
        if (!userData.email) {
            newFormError.email = "Email is required.";
            hasError = true;
        }
        if (!userData.password) {
            newFormError.password = "Password is required.";
            hasError = true;
        }
        // No validation for dateOfBirth field

        setFormError(newFormError);

        if (hasError) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(''); // Clear success message before new submission

        try {
            console.log("Sending request with data:", userData);
            const response = await registerUser(userData);
            console.log("Response received:", response);
            if (response && response.token) {
                console.log("Signup successful, token:", response.token);
                setSuccessMessage("Signup successful!"); // Set success message
                signup(response.token);
            } else if (response.error) {
                console.error("API returned an error:", response.error);
                setError(response.error);
            } else {
                console.log("Unexpected response format:", response);
                setError("Email already exists. Please try a different email.");
            }
        } catch (err) {
            console.error("An unexpected error occurred:", err);
            setError("An unexpected error occurred. Please try again later.");
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
                            <h2>Sign Up</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label text-start d-block">Name:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${formError.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                    />
                                    {formError.name && <div className="invalid-feedback">{formError.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-start d-block">Email:</label>
                                    <input
                                        type="email"
                                        className={`form-control ${formError.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                    {formError.email && <div className="invalid-feedback">{formError.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-start d-block">Password:</label>
                                    <input
                                        type="password"
                                        className={`form-control ${formError.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        placeholder="Enter password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                    />
                                    {formError.password && <div className="invalid-feedback">{formError.password}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dateOfBirth" className="form-label text-start d-block">Date of Birth:</label>
                                    <input
                                        type="date"
                                        className={`form-control ${formError.dateOfBirth ? 'is-invalid' : ''}`}
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        value={userData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                    {formError.dateOfBirth && <div className="invalid-feedback">{formError.dateOfBirth}</div>}
                                </div>
                                {error && <div className="alert alert-danger mb-3">{error}</div>}
                                {successMessage && <div className="alert alert-success mb-3">{successMessage}</div>}
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            {' '}Registering...
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                            </form>
                            <b>
                                <span className="text-decoration-none d-inline-block mb-3">Already have an account? </span>
                                <Link to="/log-in" className="text-decoration-none">Log In</Link>
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
