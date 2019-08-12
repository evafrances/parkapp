// import React from 'react'
// import { Link } from 'react-router-dom'

// const Header = () => (
//   <nav className="navbar navbar-light bg-light mb-5">
//     <div className="container">
//       <ul>
//         <li><Link className="navbar-brand" to="/">Discover</Link></li>
//         <li><Link className="navbar-brand" to="/parking">Parkings</Link></li>
//         <li><Link className="navbar-brand" to="/profile">Profile</Link></li>
//     </ul>
//     </div>
//   </nav>
// )

// export default Header

import React, {Component, Fragment} from 'react';
import '../nav.css';
import { PageHeader } from 'antd';
import { Link } from 'react-router-dom'
import { Breadcrumb, Icon } from 'antd';



class Header extends Component{
  render(){
    return(
      <div>
      <Breadcrumb className="ant-breadcrumb">
          <Breadcrumb.Item href="/">
            <Icon className="icon-nav" type="home" />
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/parking">
            <Icon className="icon-nav" type="search" />
            <span>Search</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/profile">
            <Icon className="icon-nav" type="user" />
            <span>User Profile</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        </div>
    )
  }
}
  
  // <PageHeader title="Title" subTitle="This is a subtitle" />
  // <nav className="navbar navbar-light bg-light mb-5">
  //    <div className="container">
  //      <ul>
  //        <li><Link className="navbar-brand" to="/">Discover</Link></li>
  //        <li><Link className="navbar-brand" to="/parking">Parkings</Link></li>
  //        <li><Link className="navbar-brand" to="/profile">Profile</Link></li>
  //    </ul>
  //    </div>
  //  </nav>


export default Header

