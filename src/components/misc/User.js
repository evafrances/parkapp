import React, {Component, Fragment} from 'react';
// import Header from '../components/Header'
import {Link} from 'react-router-dom'

class User extends Component{

  render(){
        return (
        <div className="jumbotron container">
        <h2>User name</h2>
        <span>Edit profile</span>
        <p>My credit cards</p>
        <p>Activity register</p> {/*adrdress es un objeto del q solo me interesa la dirección */}
        <p>Invite your friends</p> {/*inventarme precios */}
        <p>Favorite Parkings</p> {/*los que marcaste como favoritos*/}
        </div>
    )
      }
    }
export default User