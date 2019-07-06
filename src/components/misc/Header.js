import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className="navbar navbar-light bg-light mb-5">
    <div className="container">
      <ul>
        <li><Link className="navbar-brand" to="/">Discover</Link></li>
        <li><Link className="navbar-brand" to="/parking">Parkings</Link></li>
        <li><Link className="navbar-brand" to="/profile">Profile</Link></li>
    </ul>
    </div>
  </nav>
)

export default Header

