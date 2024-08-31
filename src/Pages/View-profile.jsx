import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserData } from "../Services/api";

export const ViewProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    date_of_birth: '',
   address: {
      country: '',
      city: '',
      street: '',
     zipcode: ''

  }
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        console.log('Fetched user data:', data); // Check this output in the console
        if (data && data.user) {
          setUserData({
            name: data.user.name,
            email: data.user.email,
            date_of_birth: data.user.date_of_birth,
            address: data.user.address || {}
          })
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

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  return (
      <main className="dashboard-main">
        <div className="dashboard-main-body d-flex justify-content-center align-items-center">
          <div className="profile-card">
            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : userData ? (
                <div className="profile-content">
                  <div className="text-center profile-header">
                    <h6 className="profile-name">{userData.name}</h6>
                    <span className="profile-email">{userData.email}</span>
                  </div>
                  <div className="personal-info">
                    <h6 className="info-title">Personal Info</h6>
                    <ul>
                      <li className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{userData.name}</span>
                      </li>
                      <li className="info-item">
                        <span className="info-label">Email</span>
                        <span className="info-value">{userData.email}</span>
                      </li>
                      <li className="info-item">
                        <span className="info-label">Date of Birth</span>
                        <span className="info-value">{userData.date_of_birth}</span>
                      </li>
                      <li className="info-item">
                        <span className="info-label">Country</span>
                        <span className="info-value">{userData.address.country}</span>
                      </li>
                      <li className="info-item">
                        <span className="info-label">City</span>
                        <span className="info-value">{userData.address.city}</span>
                      </li>
                      <li className="info-item">
                        <span className="info-label">Street</span>
                        <span className="info-value">{userData.address.street}</span>
                      </li>
                      <li className="info-item">
                        <span className="info-label">Zip Code</span>
                        <span className="info-value">{userData.address.zipcode}</span>
                      </li>
                    </ul>
                  </div>
                  <Link to='/update'>
                    <button className="btn btn-primary mt-5">Edit Profile</button>
                  </Link>
                </div>
            ) : (
                <div className="alert alert-info">Loading...</div>
            )}
          </div>
        </div>
      </main>
  );
}
