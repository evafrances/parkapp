import React, {Component, Fragment} from 'react';
// import Header from '../components/Header'
import {Link} from 'react-router-dom'
import DetailsP from './parkings/DetailsP';

class Parking extends Component{
  
      
  render(){
        return(
          <Fragment >
            <Link to='/parking/whereGApi'>Where do you want to park?</Link> 
            <DetailsP/>
          </Fragment>
        )
      }
    }
export default Parking