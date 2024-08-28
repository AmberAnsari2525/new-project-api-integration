import React, { useState, useEffect } from 'react';
import { updateUserData, fetchUserData } from '../Services/api';
import { Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export const UpdateProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        date_of_birth: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData();
                console.log('Fetched user data:', data);
                if (data && data.user) {
                    setUserData(data.user);
                } else {
                    setError("Failed to load user data.");
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setError(`An error occurred: ${err.message}`);
            }
        };

        getUserData();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevProfile => ({
            ...prevProfile,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setLoading(true); // Set loading state to true when the form is submitted
        try {
            const token = localStorage.getItem('token');
            await updateUserData(userData, token);
            console.log("User data updated successfully");
            navigate('/profile');
        } catch (error) {
            setError('Failed to update user data.');
        } finally {
            setLoading(false); // Reset loading state after submission
        }
    };


    return (
        <div className="container py-5">
            <div className="card">
                <div>
                    <h3 className="card-title">Edit Profile</h3>
                </div>
                <div className="card-body" style={{backgroundColor: 'gray'}}>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-12 mb-3">
                                <label
                                    htmlFor="name"
                                    className="form-label fw-semibold text-primary-light text-sm mb-2"
                                >
                                    Full Name <span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Full Name"
                                />
                            </div>
                            <div className="col-sm-12 mb-3">
                                <label
                                    htmlFor="email"
                                    className="form-label fw-semibold text-primary-light text-sm mb-2"
                                >
                                    Email <span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    className="form-control radius-8"
                                    id="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div className="col-sm-12 mb-3">
                                <label
                                    htmlFor="date_of_birth"
                                    className="form-label fw-semibold text-primary-light text-sm mb-2"
                                >
                                    Date of Birth <span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="form-control radius-8"
                                    id="date_of_birth"
                                    value={userData.date_of_birth}
                                    onChange={handleChange}
                                    placeholder="Enter Date of Birth"
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        {' '}Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
};
