
import React, {Component} from 'react';
import '../nav.css';
// import { PageHeader } from 'antd';
import { Link } from 'react-router-dom'
import { Breadcrumb, Icon, Popover, Button } from 'antd';
import {withAuthContext} from '../../contexts/AuthStore'
import { AuthContext } from '../../contexts/AuthStore';



class Header extends Component{
  render(){
    console.log(this.props)
    const content = (
      <div className="list-user">
        <Link to="/my-profile">Profile</Link>
        <Link to="http://www.alipay.com/">My credit cards</Link>
        <Link to="http://www.taobao.com/">Activity register</Link>
        <Link to="http://www.alipay.com/">Invite your friends</Link>
        <Link to="/fav">Favorite Parkings</Link>
        <Link to="/login" onClick={()=>this.props.onUserChange()}>Logout</Link>
      </div>
    );

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
          <Breadcrumb.Item>
            <Popover placement="bottomRight" content={content} trigger="click">
              <a className="ant-breadcrumb-link">
                <Icon className="icon-nav" type="user" />
                <span>User Profile</span>
              </a>
            </Popover>
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


export default withAuthContext(Header)

