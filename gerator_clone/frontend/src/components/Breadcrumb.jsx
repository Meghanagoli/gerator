import React from 'react'
import './Breadcrumb.css'

function Breadcrumb() {
  return (
    <nav className="breadcrumb">
      <div className="breadcrumb-item">
        <svg className="home-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 6L8 1.5L14 6V13.5C14 13.7652 13.8946 14.0196 13.7071 14.2071C13.5196 14.3946 13.2652 14.5 13 14.5H3C2.73478 14.5 2.48043 14.3946 2.29289 14.2071C2.10536 14.0196 2 13.7652 2 13.5V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 14.5V8.5H10V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <svg className="chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="breadcrumb-item">
        <span>Dashboard</span>
      </div>
      <svg className="chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="breadcrumb-item active">
        <span>Devices</span>
      </div>
    </nav>
  )
}

export default Breadcrumb
