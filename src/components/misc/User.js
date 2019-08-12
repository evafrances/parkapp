import React, {Component} from 'react';
// import Header from '../components/Header'
import {Link} from 'react-router-dom'
import { Menu } from 'antd';


class User extends Component{

  render(){
    return(
    <Menu>
      <Menu.Item key="0">
        <Link href="/my-profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="http://www.alipay.com/">My credit cards</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href="http://www.taobao.com/">Activity register</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href="http://www.alipay.com/">Invite your friends</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href="/fav">Favorite Parkings</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href="#">Logout</Link>
      </Menu.Item>
    </Menu>
  );
}
}

export default User

