import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { registerUser } from '../Services/api';

export const Signup = () => {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[dateOfBirth,setDateofbirth]=useState('');
    const[error,setError]=useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password, date_of_birth: dateOfBirth };


        try {
            const response = await registerUser(userData);
            if (response.error) {
                setError(response.error);
            } else {
                console.log("User Registered:", response);
            }
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>Register</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label text-start d-block">Name:</label>
                                    <input type="text"
                                           className={`form-control ${error.name ? 'is-invalid' : ''}`}
                                           id="name"
                                           placeholder="Enter the name"
                                           name="name"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-start d-block">Email:</label>
                                    <input type="email"
                                           className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                           id="email"
                                           placeholder="Enter email"
                                           name="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pwd" className="form-label text-start d-block">Password:</label>
                                    <input type="password"
                                           className={`form-control ${error.password ? 'is-invalid' : ''}`}
                                           id="pwd"
                                           placeholder="Enter password"
                                           name="password"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dob" className="form-label text-start d-block">Date of
                                        Birth:</label>
                                    <input
                                        type="date"
                                        className={`form-control ${error.date ? 'is-invalid' : ''}`}
                                        id="dob"
                                        name="dob"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateofbirth(e.target.value)}/>
                                </div>
                                <button type="submit" name="register" className="btn btn-primary btn-block">Register
                                </button>
                            </form>

                            <span className="text-decoration-none d-inline-block mb-3">Already have an account? </span>
                            <Link to="/log-in" className="text-decoration-none">Log In</Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}