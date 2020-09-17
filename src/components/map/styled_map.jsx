import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import styles from "./styles.json";

class StyledMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    const mapOptions = {
      styles: styles.styles[parseInt(this.props.selectedStyle)], // straight out of something like snazzymaps
    };
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyA-6rh4LErjM96t6CVB8YZHIIaGEvxk3BI",
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={mapOptions}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text=""
            selectedMarker={this.props.selectedMarker}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default StyledMap;
