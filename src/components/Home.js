import React, {Component} from 'react';
import './nav.css';
import Header from './misc/Header';
import { Link } from 'react-router-dom';
import ParkingService from '../services/ParkingService';
import { Row, Col } from 'antd';
import './parkings.css';


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
        <div className="div-header">
          <h1 className="display-4">Move with freedom</h1>
            <Header/>
          </div>
          <p>Parking for your vehicles</p>
        <ul className="ul-parkingsix">
        {this.state.parking.map((e,i)=>(
          <div className="li-parkingsix">
              <li key={i}> 
                  <Link key={i} to={`/parking/${e.id}/`}>{e.name}</Link>
              
              
            {/* //   <div className="image-parent">
            //       <img src={e.image_url} className="img-fluid" alt={e.name} style={{maxWidth:'30px'}} />
            //   </div> */}
              </li>
          </div>
          ))}
        </ul>
        </div>
      </article>
    )
  }
}

export default Home

