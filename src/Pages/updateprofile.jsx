import React, { useState, useEffect } from 'react';
import { updateUserData, fetchUserData } from '../Services/api';
import { Spinner } from "react-bootstrap";

export const UpdateProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        date_of_birth: '',
        country: '',
        city: '',
        street: '',
        zipcode: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // Added state for success message

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
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(''); // Reset success message before submission
        try {
            const token = localStorage.getItem('token');
            await updateUserData(userData, token);
            console.log("User data updated successfully");
            setSuccessMessage('Profile updated successfully!'); // Set success message
            console.log('Updated user data:', userData); // Log the updated data to the console
        } catch (error) {
            setError('Failed to update user data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="card modern-card">
                <div className="card-header">
                    <h3 className="card-title">Edit Profile</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3"> {/* Updated to 6 columns */}
                                <label
                                    htmlFor="name"
                                    className="form-label fw-semibold text-primary mb-2"
                                >
                                    Full Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    id="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Full Name"
                                />
                            </div>
                            <div className="col-md-6 mb-3"> {/* Updated to 6 columns */}
                                <label
                                    htmlFor="email"
                                    className="form-label fw-semibold text-primary mb-2"
                                >
                                    Email <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    className="form-control form-input"
                                    id="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div className="col-md-6 mb-3"> {/* Updated to 6 columns */}
                                <label
                                    htmlFor="date_of_birth"
                                    className="form-label fw-semibold text-primary mb-2"
                                >
                                    Date of Birth <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="form-control form-input"
                                    id="date_of_birth"
                                    value={userData.date_of_birth}
                                    onChange={handleChange}
                                    placeholder="Enter Date of Birth"
                                />
                            </div>
                            <div className="col-md-6 mb-3"> {/* Updated to 6 columns */}
                                <label
                                    htmlFor="country"
                                    className="form-label fw-semibold text-primary mb-2"
                                >
                                    Country
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    id="country"
                                    value={userData.country}
                                    onChange={handleChange}
                                    placeholder="Enter Country"
                                />
                            </div>
                            <div className="col-md-6 mb-3"> {/* Updated to 6 columns */}
                                <label
                                    htmlFor="city"
                                    className="form-label fw-semibold text-primary mb-2"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    id="city"
                                    value={userData.city}
                                    onChange={handleChange}
                                    placeholder="Enter City"
                                />
                            </div>
                            <div className="col-md-6 mb-3"> {/* Updated to 6 columns */}
                                <label
                                    htmlFor="street"
                                    className="form-label fw-semibold text-primary mb-2"
                                >
                                    Street
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    id="street"
                                    value={userData.street}
                                    onChange={handleChange}
                                    placeholder="Enter Street"
                                />
                            </div>
                            <div className="col-md-6 mb-3"> {/* Updated to 6 columns */}
                                <label
                                    htmlFor="zipcode"
                                    className="form-label fw-semibold text-primary mb-2"
                                >
                                    Zipcode
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    id="zipcode"
                                    value={userData.zipcode}
                                    onChange={handleChange}
                                    placeholder="Enter Zipcode"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
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
                    {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>} {/* Display success message */}
                    {error && <p className="text-danger text-center mt-3">{error}</p>}
                </div>
            </div>
        </div>
    );
};
