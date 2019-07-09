import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import axios from 'axios';
import './App.css';
import DetailsP from './components/parkings/DetailsP';
import Parking from './components/Parking';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import WhereGApi from './components/misc/WhereGApi';
import User from './components/misc/User';

// import User from './components/User';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


function App() {
  return (
    <div className="App">
        
        <main className="container">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path="/login" component={Register}/>
          <Route path="/parking" component={Parking}/>
          <Route path="/parking/WhereGApi" component={WhereGApi}/>
          <Route path="/parking/:id" component={DetailsP}/>
          <Route path="/profile" component={User}/>
          <Route exact path="/" component={() => (
            <Redirect to="/home" />
          )} />
          {/* <Route path="/new" component={New}/> */}
        </Switch>
        </main>
        {/* <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map> */}
    </div>
  );
  
}

export default App;
