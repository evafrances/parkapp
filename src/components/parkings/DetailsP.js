import React from 'react'
import ParkingService from '../../services/ParkingService'


class DetailsP extends React.Component {
  state = {
    park: {}
  }

  componentDidMount = () => {
    console.log(this.props.match)
    const id = '5d20a2a2cafbbb5ddcf1b528';
    ParkingService.getYourPark(id)
    //la data, los datos del parking
      .then(result => {
        this.setState({park: result.data})
        console.log(result.data)
      })
      .catch(err => console.log(err))
    }

render() {
    if (!this.state.park) 
      return <div>Loading...</div>
    
    return (
        <div className="jumbotron container">
        <h2>Parking details</h2>
           <p>{this.state.park.name}</p> {/*adrdress es un objeto del q solo me interesa la dirección */}
           <p>{this.state.park.price}</p> {/*inventarme precios */}
           <p>{this.state.park.timetable}</p> {/*inventarme horarios */}
           <p>{this.state.park.places}</p> {/*inventarme plazas libres */}
        {/*pintar como fav, en el modelo de parking?, se añadiría a los Parkings del usuario, de ahí podrá editar para cambiar nombre */}
        <a href="user/123" class="active">Reserve a park</a>
        </div>
    )
  }

}
  
export default DetailsP