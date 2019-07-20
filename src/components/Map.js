import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from 'react';
// import Geocode from "react-geocode";


const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const MyMapComponent = withScriptjs(withGoogleMap((props) => {

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



    