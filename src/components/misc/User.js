import React, {Component, Fragment} from 'react';
// import Header from '../components/Header'
import {Link} from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd';


class User extends Component{

  render(){
    return(
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">User name</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">Edit profile</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="http://www.alipay.com/">My credit cards</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="http://www.taobao.com/">Activity register</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="http://www.alipay.com/">Invite your friends</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="http://www.taobao.com/">Favorite Parkings</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="#">Logout</a>
      </Menu.Item>
    </Menu>
  );
}
}

export default User

