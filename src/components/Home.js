import React, {Component} from 'react';
import Header from './misc/Header';
import { Link } from 'react-router-dom';
import ParkingService from '../services/ParkingService';

class Home extends Component{
  state = {
    parking : []
  }

  //llenamos el stado con una llamada a la API
  componentDidMount = () => {
    ParkingService.getParkings()
    //la data, los datos del parking
      .then(parking => {
        console.log(parking.data.length)
        const inicio = Math.floor(Math.random() * parking.data.length - 6)
        //parkings aleatorios de 6 en 6 
        const sixPark = parking.data.slice(inicio, inicio + 6)
        console.log(sixPark)
        this.setState({parking: sixPark})
      })
      .catch(err => console.log(err))
    }

  render(){
    return (
      <article className="Home">
        <div className="jumbotron container">
          <h1 className="display-4">Move with freedom</h1>
          <p className="lead">Explore, dreams, discover</p>
          <Header/>
          <p>Parking for your vehicles</p>
        <ul>
        {this.state.parking.map((e,i)=>
        { let title = e.title.replace('Aparcamiento público.', '')
          title = title.replace('Aparcamiento mixto.', '')
          return (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="flex-column">
                {title}
              </div>
              
            {/* //   <div className="image-parent">
            //       <img src={e.image_url} className="img-fluid" alt={e.name} style={{maxWidth:'30px'}} />
            //   </div> */}
          </li>
          )})}
        </ul>
        </div>
      </article>
    )
  }
}

export default Home