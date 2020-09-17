import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "blue",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

class Marker extends Component {
  render() {
    const { addresses, googleAPI } = this.props.values;
    const center = {
      lat: addresses[0].lat,
      lng: addresses[0].lng,
    };
    addresses.sort(function (a, b) {
      return a.formatted_address > b.formatted_address
        ? 1
        : b.formatted_address > a.formatted_address
        ? -1
        : 0;
    });
    const key = { key: googleAPI };
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <div style={{ height: "90vh", width: "90%" }}>
            <GoogleMapReact
              bootstrapURLKeys={key}
              defaultCenter={center}
              defaultZoom={6}
            >
              {addresses.map((coords) => (
                <AnyReactComponent
                  key={coords.lat}
                  lat={coords.lat}
                  lng={coords.lng}
                  text={"Marker Here"}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary m-2" onClick={this.props.prevStep}>
            STYLE
          </button>
          <button
            className="btn btn-danger m-2"
            onClick={this.props.deleteAddress}
          >
            GO TO YOUR MAP
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Marker;
