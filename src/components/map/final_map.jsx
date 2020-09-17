import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import styles from "./styles.json";

class FinalMap extends Component {
  render() {
    const { addresses, googleAPI } = this.props.values;
    const center = {
      lat: addresses[0].lat,
      lng: addresses[0].lng,
    };
    const key = { key: googleAPI };
    const mapOptions = {
      styles: styles.styles[parseInt(this.props.selectedStyle)], // straight out of something like snazzymaps
    };
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={key}
          defaultCenter={center}
          defaultZoom={6}
          options={mapOptions}
        >
          {addresses.map((coords) => (
            <Marker
              key={coords.lat}
              lat={coords.lat}
              lng={coords.lng}
              selectedMarker={this.props.selectedMarker}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default FinalMap;
