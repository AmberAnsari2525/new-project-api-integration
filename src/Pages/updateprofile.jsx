import React, { useState } from 'react';

export const UpdateProfile = () => {  // Changed from 'updateProfile' to 'UpdateProfile'
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        number: '',
        department: '',
        designation: '',
        language: '',
        description: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevProfile) => ({
            ...prevProfile,
            [id]: value
        }));
    };
    const handleSubmit = () => {

    }
    return (
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
    )
}
