import React from 'react'
import ParkingService from '../../services/ParkingService'
import { Card } from 'antd';
import '../parkings.css';
import { Collapse } from 'antd';


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
    park: {}
  }

  componentDidMount = () => {
    console.log(this.props.match)
    //! PREGUBTAR A JULIO
    const id = '5d20a2a2cafbbb5ddcf1b523';
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
      <div>
        <Card title="Parking details" style={{ width: 400 }}>
          <p>Name:{this.state.park.name}</p> {/*adrdress es un objeto del q solo me interesa la dirección */}
            <p>Price/h:{this.state.park.price}</p> {/*inventarme precios */}
            <p>Timetable:{this.state.park.timetable}</p> {/*inventarme horarios */}
            <p>Available Places:{this.state.park.places}</p> {/*inventarme plazas libres */}
          {/*pintar como fav, en el modelo de parking?, se añadiría a los Parkings del usuario, de ahí podrá editar para cambiar nombre */}
          <a href="user/123" className="active">Reserve a park</a>
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
  
export default DetailsP



