import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  ,InfoWindow} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React", 
    };
  }

 
  moveMarker(event){ 
  } 
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 9.689051511629861,
            lng: -85.14241018739736
          }} 
        >
     
        <Marker
  title="Location"
  id={1} 
  draggable={true}
  onDragend={this.moveMarker.bind(this)}
  onClick={(eve)=> console.log(eve)}
  >
  <InfoWindow
    visible={true} 
    >
      <div >
        <p>Click on the map or drag the marker to select location where the incident occurred</p>
      </div>
  </InfoWindow>
</Marker>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWeA8V0syvxXnYcN-FhlxqvLXvwGTqe7M'
})(Maps);