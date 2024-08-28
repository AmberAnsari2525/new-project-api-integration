import Button from 'react-bootstrap/Button';
import React, {useContext} from 'react'
import { useState } from 'react';
import { Link,  } from 'react-router-dom';
import { registerUser} from '../Services/api';
export const Signup = () => {
    const [errors, setError] = useState({});
    const [loading, setLoading] = useState(false); // Loading state

    const [userData, setuserData] = useState({
        name: '',
        email: '',
        password: '',
        date_of_birth: "",

    });

    // Handle input changes
    const handleChange = (e) => {
        setuserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setLoading(true); // Set loading state to true when submission starts

        try {
            console.log("Sending request with data:", userData);
            const response = await registerUser(userData);
            console.log("Response received:", response);

            // Check if the response contains a token
            if (response && response.token) {
                console.log("Register successful, token:", response.token);
                // Remove the login function call
                // Handle the token as needed (e.g., store it or use it for further requests)
            } else if (response && response.error) {
                // Handle API error response
                console.error("API returned an error:", response.error);
                setError(response.error);
            } else {
                // Handle unexpected response format
                console.log("Unexpected response format:", response);
                setError("An unexpected error occurred. Please try again.");
            }
        } catch (err) {
            // Improved error handling
            if (err.response) {
                // Handle known error responses from the API
                if (err.response.status === 401) {
                    console.error("Invalid credentials:", err.response.data);
                    setError("Invalid email or password. Please try again.");
                } else if (err.response.status === 400) {
                    console.error("Bad request:", err.response.data);
                    setError("There was a problem with your request. Please check your input and try again.");
                } else {
                    console.error("API error:", err.response.data);
                    setError("An error occurred while communicating with the server. Please try again later.");
                }
            } else {
                // Handle network or other errors
                console.error("An unexpected error occurred:", err);
                setError("An unexpected error occurred. Please try again later.");
            }
            console.log("User registration failed:", err);
        } finally {
            setLoading(false); // Ensure loading state is reset after submission
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
                                value={userData.date}
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
