import React from "react";
import marker0 from "./marker0.png";
import marker1 from "./marker1.png";
import marker2 from "./marker2.png";
import marker3 from "./marker3.png";

const Marker = (props) => {
  const markers = [marker0, marker1, marker2, marker3];
  return (
    <div>
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
    </div>
  );
};

export default Marker;
