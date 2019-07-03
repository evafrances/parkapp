
import React, {Component, Fragment} from 'react'
// import Header from '../components/Header'
import ParkingService from '../services/ParkingService'
// import Cards from '../components/Cards'

class Park extends Component {
  state = {
    park : {},
    style: {
      maxWidth: '50px', 
      margin: 'auto', 
      paddingTop: '2em'
    }
  }

  componentDidMount () {
    const {id} = this.props.match.params
    ParkingService.getParkbyId(id)
      .then(
        park => this.setState({park}), 
        err => console.error(err)
      )
  }

  render (props){
    
    return (
        <Fragment>
        {/* <Header /> */}
        <div className="container pt-2">
            <h1>Hola soy tu Park</h1>
          {/* <Cards 
            name={this.state.beer.name} 
            style={this.state.style}
            img={this.state.beer.image_url && this.state.beer.image_url } 
            description = {this.state.beer.description && this.state.beer.description}
          /> */}
        </div>
      </Fragment>
    )
  }
}
export default Park