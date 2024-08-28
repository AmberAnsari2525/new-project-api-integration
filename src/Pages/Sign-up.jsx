import Button from 'react-bootstrap/Button';
import React from 'react'
import { useState } from 'react';
import { Link,  } from 'react-router-dom';
import { registerUser } from '../Services/api';

export const Signup = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Loading state

    const [userData, setuserData] = useState({
        name: '',
        email: '',
        password: '',
        date: "",

    });

    // Handle input changes
    const handleChange = (e) => {
        setuserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submission starts

        try {
            const response = await registerUser (userData);
            setLoading(false); // Set loading to false when submission ends
            if (response.errors) {
                setErrors(response.errors); // Set validation errors if any
            } else {
                console.log("User Registered:", response);
                // Optionally redirect to login page or show a success message
            }
        } catch (err) {
            setLoading(false); // Set loading to false on error
            console.error("Registration failed:", err);
            // Handle general errors (network issues, etc.)
        }
    };

    return (
        <div className='container'>
            <div className='row'>

                <div className='col-lg-6'>
                    <h1>Sign Up</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-5">
                            <input
                                placeholder='Enter Full Name'
                                type="text"
                                name="name"
                                className="form-control"
                                id="exampleInputName"
                                value={userData.name}
                                onChange={handleChange}
                            />
                        </div>
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
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder='Date of Birth'
                                name="date"
                                type="date"
                                className="form-control"
                                id="exampleInputDate"
                                value={useState.date}
                                onChange={handleChange}
                            />
                        </div>
                        <b>
                            <span className="text-decoration-none d-inline-block mb-3">Already Have no account? </span>
                            <Link to="/log-in" className="text-decoration-none">Log in</Link>
                        </b>
                        <br />

                        <Button type="submit" variant='primary'>
                            Submit
                        </Button>
                    </form>
                </div>
                <div className='col-lg-6'>
                </div>
            </div>
        </div>
    );

}
