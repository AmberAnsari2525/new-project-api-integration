import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchUserData  } from "../Services/api";

export const Viewprofile = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
        try {
            const data = await fetchUserData ();
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

 
  return (
    
   <main className="dashboard-main">
        <div className="dashboard-main-body">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
            <h6 className="fw-semibold mb-0">View Profile</h6>
            <ul className="d-flex align-items-center gap-2">
              <li className="fw-medium">
                <a href="/index.html" className="d-flex align-items-center gap-1 hover-text-primary">
                  <iconify-icon icon="solar:home-smile-angle-outline" className="icon text-lg"></iconify-icon>
                  Dashboard
                </a>
              </li>
              <li>-</li>
              <li className="fw-medium">View Profile</li>
            </ul>
          </div>
          <div className="row gy-4">
            {error ? (
                <div className="col-lg-12">
                  <div className="alert alert-danger">{error}</div>
                </div>
            ) : userData ? (
                <div className="col-lg-4">
                  <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                    <img src="/assets/images/user-grid/user-grid-bg1.png" alt="" className="w-100 object-fit-cover"/>
                    <div className="pb-24 ms-16 mb-24 me-16  mt--100">
                      <div className="text-center border border-top-0 border-start-0 border-end-0">
                        <img src="/assets/images/user-grid/user-grid-img14.png" alt=""
                             className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"/>
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
                          <li className="d-flex align-items-center gap-1 mb-12">
                            <span className="w-30 text-md fw-semibold text-primary-light">Phone Number</span>
                            <span className="w-70 text-secondary-light fw-medium">: {userData?.number}</span>
                          </li>
                          <li className="d-flex align-items-center gap-1 mb-12">
                            <span className="w-30 text-md fw-semibold text-primary-light">Department</span>
                            <span className="w-70 text-secondary-light fw-medium">: {userData?.department}</span>
                          </li>
                          <li className="d-flex align-items-center gap-1 mb-12">
                            <span className="w-30 text-md fw-semibold text-primary-light">Designation</span>
                            <span className="w-70 text-secondary-light fw-medium">: {userData?.designation}</span>
                          </li>
                          <li className="d-flex align-items-center gap-1 mb-12">
                            <span className="w-30 text-md fw-semibold text-primary-light">Languages</span>
                            <span className="w-70 text-secondary-light fw-medium">: {userData?.language}</span>
                          </li>
                          <li className="d-flex align-items-center gap-1">
                            <span className="w-30 text-md fw-semibold text-primary-light">Bio</span>
                            <span className="w-70 text-secondary-light fw-medium">: {userData?.description}</span>
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
           
          </div>
        </div>
      </main>
  );

  }    