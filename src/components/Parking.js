import React, {Component, Fragment} from 'react';
// import Header from '../components/Header'
import {Link} from 'react-router-dom'
import DetailsP from './parkings/DetailsP';
import ParkingService from '../services/ParkingService';
import {withAuthContext} from '../contexts/AuthStore'

import MyMapComponent from './Map';
const apiKey = "AIzaSyDi-w0iYfqgZOOELu3fJD8vF6yTy7Jvbm4"


class Parking extends Component{
  state = {
    parking : [],
    parkingDestailId: '',
  }
  
  
//llenamos el stado con una llamada a la API
componentDidMount = () => {
  ParkingService.getParkings()
  //la data, los datos del parking
    .then(parking => {
      const parkingsMapa = parking.data
      this.setState({parking: parkingsMapa})
    })
    .catch(err => console.log(err))
  }
   
  onDetailsInfo = (id) =>{
    console.log('ooooo')
    this.setState({parkingDestailId: id})
  }
  render(){
    console.log(this.props)
        return(
          <Fragment >
            <Link to='/parking/whereGApi'>Where do you want to park?</Link>
            {this.state.parking && <MyMapComponent
              isMarkerShown
              detailsInfo = {this.onDetailsInfo}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              data={this.state.parking}
            />}
            {this.state.parkingDestailId && <DetailsP 
              idDetailsParking = {this.state.parkingDestailId}/> 
            }
          </Fragment>
        )
      }
    }
export default withAuthContext(Parking)