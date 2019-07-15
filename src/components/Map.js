import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from 'react';
// import Geocode from "react-geocode";


const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
   
//         super( props );
//         this.state = {
//          address: '',
//          city: '',
//          area: '',
//          state: '',
//          mapPosition: {
//           lat: this.props.center.lat,
//           lng: this.props.center.lng
//          },
//          markerPosition: {
//           lat: this.props.center.lat,
//           lng: this.props.center.lng
//         }
//        }
//       /**
//         * Get the current address from the default map position and set those values in the state
//         */
//        componentDidMount() {
//         Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
//          response => {
//           const address = response.results[0].formatted_address,
//            addressArray =  response.results[0].address_components,
//            city = this.getCity( addressArray ),
//            area = this.getArea( addressArray ),
//            state = this.getState( addressArray );
        
//           console.log( 'city', city, area, state );
        
//           this.setState( {
//            address: ( address ) ? address : '',
//            area: ( area ) ? area : '',
//            city: ( city ) ? city : '',
//            state: ( state ) ? state : '',
//           } )
//          },
//          error => {
//           console.error(error);
//          }
//         );
//        };
//     /**
//   * When the user types an address in the search box
//   * 
// @param place
//   */
//  onPlaceSelected = ( place ) => {
//     const address = place.formatted_address,
//        addressArray =  place.address_components,
//        city = this.getCity( addressArray ),
//        area = this.getArea( addressArray ),
//        state = this.getState( addressArray ),
//        latValue = place.geometry.location.lat(),
//        lngValue = place.geometry.location.lng();
//     // Set these values in the state.
//       this.setState({
//        address: ( address ) ? address : '',
//        area: ( area ) ? area : '',
//        city: ( city ) ? city : '',
//        state: ( state ) ? state : '',
//        markerPosition: {
//         lat: latValue,
//         lng: lngValue
//        },
//        mapPosition: {
//         lat: latValue,
//         lng: lngValue    
//        },
//       })
//      };

    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 40.434154, lng: -3.598831 }}>
        
            {props.data.map((el, i) => {
                return (
                <Marker icon={el.available ? '/green-box.svg': '/red-box.svg'}
                    label={`${el.price.toFixed(2).toString()} €/h`} onClick={()=>props.detailsInfo(el.id)} key={i} position={{ lat: el.location[0], lng: el.location[1] }} />
            )})}
        </GoogleMap>
    )
}))

export default MyMapComponent



    