import React from 'react'

export const Errorpage= () => {
 
  return (
    
    <div>
      


<main className="dashboard-main">
  

  <div className="dashboard-main-body">

    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
  <h6 className="fw-semibold mb-0">404</h6>
  <ul className="d-flex align-items-center gap-2">
    <li className="fw-medium">
      <a href="/" className="d-flex align-items-center gap-1 hover-text-primary">
        <iconify-icon icon="solar:home-smile-angle-outline" className="icon text-lg"></iconify-icon>
        Dashboard
      </a>
    </li>
    <li>-</li>
    <li className="fw-medium">404</li>
  </ul>
</div>
    
    <div className="card basic-data-table">
      <div className="card-body py-80 px-32 text-center">
        <img src="/assets/images/error-img.png" alt="" className="mb-24"/>
        <h6 className="mb-16">Page not Found</h6>
        <p className="text-secondary-light">Sorry, the page you are looking for doesn’t exist </p>
        <a href="/sign-in" className="btn btn-primary-600 radius-8 px-20 py-11">Back to Home</a>
      </div>
    </div>
  </div>

  
</main>


    </div>
  )
}
