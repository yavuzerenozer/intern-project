import React from "react";
import marker0 from "../map/marker0.png";
import marker1 from "../map/marker1.png";
import marker2 from "../map/marker2.png";
import marker3 from "../map/marker3.png";

const InfoWindow = (props) => {
  const { place } = props;
  const infoWindowStyle = {
    position: "relative",
    bottom: 150,
    left: "-45px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };
  return (
    <div style={infoWindowStyle}>
      <div
        style={{ display: "inline-block", width: "200px" }}
        className="d-inline-block text-truncate badge badge-success"
      >
        {place.fullAddress}
      </div>
      <div className="badge badge-info">{place.data.text}: </div>
      <div className="badge badge-warning">{place.data.answer}</div>
    </div>
  );
};

const Marker = (props) => {
  const markerStyle = {
    cursor: "pointer",
  };
  const markers = [marker0, marker1, marker2, marker3];
  return (
    <div style={markerStyle}>
      <img
        src={markers[parseInt(props.selectedMarker)]}
        alt="Instructions"
        style={{
          padding: "15px 10px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
      {props.show && <InfoWindow place={props} />}
    </div>
  );
};

export default Marker;
