import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import FormField from '../misc/FormField';
import ParkingService from '../../services/ParkingService'


class MyFavs extends Component{
  state = {
    parking : []
  }

//   //llenamos el stado con una llamada a la API
  componentDidMount() {
    ParkingService.getFavPark()
      .then(({data}) => {
        this.setState({parking: data.map(e => ({name:e.name, id:e._id}))})
      })
      .catch(err =>{
        console.log(err)})
    }

  render(){
    return (
      <article className="Home">
          <h1 className="display-4">Design your Parkings fav</h1>
        <ul style={{width: '100%', display:'flex', flexDirection: 'column'}} className="ul-parkingsix">
        {this.state.parking.map((e,i)=>(
          <div className="li-parkingsix" key={i}>
              <li style={{width: '100%', border: '1px solid black'}} key={i}>
                  <Link key={i} to={`/parking/${e.id}/`}>{e.name}</Link>
                  <div><Link to={`/parking/${e.id}/fav`}>Edit</Link></div>
              </li>
          </div>
          ))}
        </ul>
      </article>
    )
  }
}

export default MyFavs



