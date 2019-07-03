import React, {Component, Fragment} from 'react'
// import Header from '../components/Header'
import {Link} from 'react-router-dom'

class Parking extends Component{
  
      
  render(){
        return(
          <Fragment >
            <p>¿Dónde quieres aparcar?</p>
            {/* <Header />
            <ul className="list-group">
              {this.state.beers.map((e,i)=>(
                <Link 
                  to={`beers/${e._id}`}  
                  style={{color:'black'}}
                  key={i} 
                  className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="flex-column">
                    {e.name}
                    <p><small>by {e.contributed_by && e.contributed_by}</small></p>
                    <div>{e.description && e.description.substring(0,140)}</div>
                    <span className="badge badge-info badge-pill">{e.tagline}</span>
                  </div>
                  <div className="image-parent">
                      <img src={e.image_url} className="img-fluid" alt={e.name} style={{maxWidth:'30px'}} />
                  </div>
                </Link>
              ))}
            </ul> */}
          </Fragment>
        )
      }
    }
export default Parking