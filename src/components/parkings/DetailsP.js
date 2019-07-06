import React from 'react'
import ParkingService from '../../services/ParkingService'


class DetailsP extends React.Component {
  state = {
    park: []
  }

  componentDidMount = () => {
    ParkingService.getParkings()
    //la data, los datos del parking
      .then(park => {
        this.setState({park: park.data})
        console.log(park)
      })
      .catch(err => console.log(err))
    }

render() {
    if (!this.state.park) 
      return <div>Loading...</div>
    
    return (
        <div className="jumbotron container">
        <h2>Parking details</h2>
        {this.state.park.map((e, i)=>(
           <li key={i}>
           <h3>{e.name}</h3>
           <p>{this.state.park.address}</p> {/*adrdress es un objeto del q solo me interesa la dirección */}
           <p>{this.state.park.price}</p> {/*inventarme precios */}
           <p>{this.state.park.timetable}</p> {/*inventarme horarios */}
           <p>{this.state.park.places}</p> {/*inventarme plazas libres */}
          </li>
        ))}
        {/*pintar como fav, en el modelo de parking?, se añadiría a los Parkings del usuario, de ahí podrá editar para cambiar nombre */}
        <a href="user/123" class="active">Reserve a park</a>
        </div>
    )
  }

}
  
export default DetailsP