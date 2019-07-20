import React, {Component} from 'react';
import './nav.css';
import Header from './misc/Header';
import { Link } from 'react-router-dom';
import ParkingService from '../services/ParkingService';
// import { Row, Col, Avatar } from 'antd';
import { Avatar } from 'antd';
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
          <div className="line-header"></div>
            <Header/>
          </div>
          <p className="p-parkingFor">Parking for your vehicles</p>
        <ul className="ul-parkingsix">
        {this.state.parking.map((e,i)=>(
          <div className="li-parkingsix">
              <li key={i}> 
                  <Link key={i} to={`/parking/${e.id}/`}>{e.name}
                  <Avatar style={{ color: getRandomColor(), backgroundColor: getRandomColor()}}>P</Avatar>
                  </Link>
              
              
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
