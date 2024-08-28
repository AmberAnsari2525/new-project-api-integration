import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchUserData } from "../Services/api";

export const Viewprofile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    number: '',
    department: '',
    designation: '',
    language: '',
    description: ''
  });
  const [error, setError] = useState(null);
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
  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevProfile) => ({
      ...prevProfile,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post('https://jwtauth.techxdeveloper.com/api/user/update', userData, config);

      // Handle success
      console.log('User updated successfully', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (

    <main className="dashboard-main">
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">View Profile</h6>

        </div>
        <div className="row gy-4">
          {error ? (
            <div className="col-lg-12">
              <div className="alert alert-danger">{error}</div>
            </div>
          ) : userData ? (
            <div className="col-lg-4">
              <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                <img src="/assets/images/user-grid/user-grid-bg1.png" alt="" className="w-100 object-fit-cover" />
                <div className="pb-24 ms-16 mb-24 me-16  mt--100">
                  <div className="text-center border border-top-0 border-start-0 border-end-0">
                    <img src="/assets/images/user-grid/user-grid-img14.png" alt=""
                      className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover" />
                    <h6 className="mb-0 mt-16">{userData?.name}</h6>
                    <span className="text-secondary-light mb-16">{userData?.email}</span>
                  </div>
                  <div className="mt-24">
                    <h6 className="text-xl mb-16">Personal Info</h6>
                    <ul>
                      <li className="d-flex align-items-center gap-1 mb-12">
                        <span className="w-30 text-md fw-semibold text-primary-light">Full Name</span>
                        <span className="w-70 text-secondary-light fw-medium">: {userData?.name}</span>
                      </li>
                      <li className="d-flex align-items-center gap-1 mb-12">
                        <span className="w-30 text-md fw-semibold text-primary-light">Email</span>
                        <span className="w-70 text-secondary-light fw-medium">: {userData?.email}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="alert alert-info">Loading...</div>
            </div>
          )}
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-body p-24">
                <ul className="nav border-gradient-tab nav-pills mb-20 d-inline-flex" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link d-flex align-items-center px-24 active" id="pills-edit-profile-tab"
                      data-bs-toggle="pill" data-bs-target="#pills-edit-profile" type="button" role="tab"
                      aria-controls="pills-edit-profile" aria-selected="true">
                      Edit Profile
                    </button>
                  </li>


                </ul>

                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-edit-profile" role="tabpanel"
                    aria-labelledby="pills-edit-profile-tab" tabIndex="0">
                    <h6 className="text-md text-primary-light mb-16">Profile Image</h6>
                    <div className="mb-24 mt-16">
                      <div className="avatar-upload">
                        <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                          <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" hidden />
                          <label htmlFor="imageUpload"
                            className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 radius-16">
                            <iconify-icon icon="fluent:edit-16-regular"></iconify-icon>
                          </label>
                        </div>
                        <img src="/assets/images/user-grid/user-grid-img14.png" alt="" className="w-200-px h-200-px rounded-circle object-fit-cover" />
                      </div>
                    </div>

                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-24">
                          <label htmlFor="name" className="form-label">Full Name</label>
                          <input type="text" className="form-control" id="name" value={userData.name} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-24">
                          <label htmlFor="email" className="form-label">Email Address</label>
                          <input type="email" className="form-control" id="email" value={userData.email} onChange={handleChange} />
                        </div>





                        <div className="col-md-12 text-end">
                          <button
                            type="button"
                            className="btn btn-primary border border-primary-600 text-md px-56 py-11 radius-8"
                            onClick={handleSubmit}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="tab-pane fade" id="pills-change-passwork" role="tabpanel"
                    aria-labelledby="pills-change-passwork-tab" tabIndex="0">
                    {/* Change Password Content */}
                  </div>
                  <div className="tab-pane fade" id="pills-notification" role="tabpanel"
                    aria-labelledby="pills-notification-tab" tabIndex="0">
                    {/* Notification Settings Content */}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );

}    