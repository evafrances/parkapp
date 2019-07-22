import React from 'react'
import ParkingService from '../../services/ParkingService'
import MailService from '../../services/MailService'
import { Card } from 'antd';
import '../parkings.css';
import { Collapse } from 'antd';
import { Icon } from 'antd';
import {withAuthContext} from './../../contexts/AuthStore'

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `Stopping the vehicle and leaving it unoccupied is called parking. There are different types of parking. The most common types of parking are angle parking, perpendicular parking and parallel parking.`;


class DetailsP extends React.Component {
  state = {
    park: {},
    isFavorite: false
  }

  componentWillReceiveProps = () => { //! < = PREGUBTAR A JULIO
    const id = this.props.idDetailsParking;
    if (id !== '') {
      ParkingService.getYourPark(id) //la data, los datos del parking
      .then(result => { // [...] {..}
        this.setState({
          park: result.data,
          isFavorite: false
          // isFavorite: result.data.isFavorite 
        }) //! <= aqui debe llegar si es favorito o no
        console.log(result.data)
      })
      .catch(err => console.log(err))
    }
    }

    onFavorite = () => {
      if (!this.state.park.id) return;
      ParkingService.addFavorite(this.state.park.id, this.state.park.name)
    .then(result => {
      this.setState({isFavorite: true})
      console.log(result.data)
    })
    .catch(err => {
      console.log(err)
      this.setState({isFavorite: true})
    })
  }

    sendMail = () => {
      MailService.postMail({
        parking: this.state.park.id
      })
      .then(result => {
        console.log(result)
        this.setState({
          park: {
            ...this.state.park,
            places: this.state.park.places - 1
          }
        }, () => console.log(this.state))
      })
      .catch(err => {
        console.log(err)
      })
    }
    
render() {
    if (!this.state.park) 
      return <div>Loading...</div>
    
    return (
      <div>
        <Card title="Parking details" style={{ width: 420 }}>
          <div className="div-pd"><p className="p-details">Name:</p><p>{this.state.park.name}</p></div> {/*adrdress es un objeto del q solo me interesa la dirección */}
            <div className="div-pd"><p className="p-details">Price/h:</p><p>{this.state.park.price && this.state.park.price.toFixed(2)}</p></div> {/*inventarme precios */}
            <div className="div-pd"><p className="p-details">Timetable:</p><p>{this.state.park.timetable}</p></div> {/*inventarme horarios */}
            <div className="div-pd"><p className="p-details">Available Places:</p><p>{this.state.park.places && this.state.park.places.toFixed(0)}</p></div> {/*inventarme plazas libres */}
            <div className="div-pd"><p className="p-details">Description:</p><p className="d-scroll">{this.state.park.description}</p></div> {/*inventarme plazas libres */}

          {/*pintar como fav, en el modelo de parking?, se añadiría a los Parkings del usuario, de ahí podrá editar para cambiar nombre */}
          <p className="p-reserve" onClick={this.sendMail}>Reserve a park</p>
          <div>
            <Icon type="heart" onClick={this.onFavorite}  theme={this.state.isFavorite === true && 'twoTone'} twoToneColor="#eb2f96" />
          </div>
          <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel className="panel-comments" header="Comments">
              <p>{text}</p>
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Card>
      </div>
    )
  }

}
  
export default withAuthContext(DetailsP) // HOC



