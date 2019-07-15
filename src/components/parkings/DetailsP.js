import React from 'react'
import ParkingService from '../../services/ParkingService'
import { Card } from 'antd';
import '../parkings.css';
import { Collapse } from 'antd';
import { Button, Icon } from 'antd';
import {withAuthContext} from './../../contexts/AuthStore'

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


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
          // isFavorite: result.data.isFavorite 
        }) //! <= aqui debe llegar si es favorito o no
        console.log(result.data)
      })
      .catch(err => console.log(err))
    }
    }

    onFavorite = () => {
      const id = this.props.idDetailsParking;
      ParkingService.addFavorite(id)
    .then(result => {
      this.setState({isFavorite: true})
      console.log(result.data)
    })
    .catch(err => {
      console.log(err)
      this.setState({isFavorite: true})
    })
  }


render() {
    if (!this.state.park) 
      return <div>Loading...</div>
    
    return (
      <div>
        <Card title="Parking details" style={{ width: 400 }}>
          <p>Name:{this.state.park.name}</p> {/*adrdress es un objeto del q solo me interesa la dirección */}
            <p>Price/h:{this.state.park.price && this.state.park.price.toFixed(2)}</p> {/*inventarme precios */}
            <p>Timetable:{this.state.park.timetable}</p> {/*inventarme horarios */}
            <p>Available Places:{this.state.park.places && this.state.park.places.toFixed(0)}</p> {/*inventarme plazas libres */}
          {/*pintar como fav, en el modelo de parking?, se añadiría a los Parkings del usuario, de ahí podrá editar para cambiar nombre */}
          <a href="user/123" className="active">Reserve a park</a>
          <div>
            <Icon type="heart" onClick={this.onFavorite}  theme={this.state.isFavorite === true && 'twoTone'} twoToneColor="#eb2f96" />
          </div>
          <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="Comments">
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



