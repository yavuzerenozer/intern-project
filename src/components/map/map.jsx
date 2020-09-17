import React, { Component } from "react";
import Geocode from "react-geocode";
import { geocode } from "../api/apiCall";
import classic from './marker0.png';
import human from './marker1.png';
import green from './marker2.png';
import blue from './marker3.png';

class Map extends Component {
  componentDidMount() {
    window.JF.getFormSubmissions(
      this.props.values.selectedForm,
      {
        offset: 0,
        limit: 1000,
        orderby: "id",
        direction: "ASC",
      },
      (response) => {
        let addresses = [];
        let labels = [];
        let coordinates = [];
        let selectedQuestion = parseInt(this.props.values.selectedQuestion);
        let selectedLabel = parseInt(this.props.values.selectedLabel);
        let address = "";
        let label_answer = "";

        for (let i = 0; i < response.length; i++) {
          for (let k in response[i].answers[selectedQuestion].answer) {
            address += response[i].answers[selectedQuestion].answer[k];
            address += ",";
          }

          for (let k in response[i].answers[selectedLabel].answer) {
            label_answer += response[i].answers[selectedLabel].answer[k];
            label_answer += " ";
          }
          let label_address = { label: label_answer, address: address };
          labels.push(label_address);
          addresses.push(address);
          if (labels.length === response.length)
            labels.push(response[i].answers[selectedLabel].text);
          label_answer = "";
          address = "";
        }
        labels.sort(function (a, b) {
          return a.address > b.address ? 1 : b.address > a.address ? -1 : 0;
        });
        for (let i = 0; i < addresses.length; i++) {
          geocode(addresses[i], this.props.values.googleAPI).then(
            (response) => {
              if (response.results.length > 0) {
                const { lat, lng } = response.results[0].geometry.location;
                const { formatted_address } = response.results[0];
                coordinates.push({ lat, lng, formatted_address });
              } else {
                coordinates.push({
                  lat: "100",
                  lng: "100",
                  formatted_address: "",
                });
              }
            },
            (error) => {
              console.error(error);
            }
          );
        }

        this.props.handleAddresses(coordinates);
        this.props.handleLabels(labels);
      }
    );
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    this.props.prevStep();
  };

  render() {
    const marker_styles = [
      { select: "0", text: "Classic", img: classic },
      { select: "1", text: "Human", img: human },
      { select: "2", text: "Green", img: green },
      { select: "3", text: "Blue", img: blue },
    ];
    const map_styles = [
      { select: "0", text: "White" },
      { select: "1", text: "Gray" },
      { select: "2", text: "Blue Water" },
      { select: "3", text: "Dark Blue" },
    ];
    return (
      <React.Fragment>
        <div className="usercontainer container">
          <h3 className="userheading">Your JotMap Data</h3>
          <div className="row">
            <p className="userp col-md-auto">User:</p>
            <p className="useri col column-overflow">{window.jusername}</p>
          </div>
          <div className="row">
            <p className="userp col-md-auto">Form ID:</p>
            <p className="useri col column-overflow">
              <a href={`https://jotform.com/${this.props.values.selectedForm}`}>
                {this.props.values.selectedForm}
              </a>
            </p>
          </div>

          <hr />
          <h3 className="userheading mt-4">Step 5</h3>
          <p className="userp">
            <i className="fa fa-map-marker" aria-hidden="true"></i> Select a
            style for the marker
          </p>
          <hr />
          <div className="table-container-2">
            <table className="table table-borderless">
              <tbody>
                {marker_styles.map((element) => {
                  let checked = false;
                  let lclass = "form-check-label ml-3 table-active1";
                  if (element.select === this.props.selectedMarker)
                    checked = true;
                  return (
                    <tr key={element.select}>
                      <td>
                        <label className={lclass + " container container-1"}>
                          {element.text}
                          <input
                            key={element.select}
                            type="radio"
                            name="marker-selector"
                            defaultChecked={checked}
                            id={element.select}
                            value={element.select}
                            onClick={this.props.handleChange("selectedMarker")}
                          />
                          <span className="checkmark"></span>
                          <img alt="" src={element.img} style={{
                            width: 24
                          }}
                          />
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <hr />
        </div>

        <div className="container ">
          <h3 className="userheading mt-4">Step 6</h3>
          <p className="userp ">
            <i className="fa fa-tag" aria-hidden="true"></i> Select a map style.
          </p>

          <hr />
          <div className="table-container-2">
            <table className="table table-borderless">
              <tbody>
                {map_styles.map((element) => {
                  let checked = false;
                  let lclass = "form-check-label ml-3 table-active1";
                  if (element.select === this.props.selectedStyle)
                    checked = true;
                  return (
                    <tr key={element.select}>
                      <td>
                        <label className={lclass + " container container-1"}>
                          {element.text}
                          <input
                            key={element.select}
                            type="radio"
                            name="style-selector"
                            defaultChecked={checked}
                            id={element.select}
                            value={element.select}
                            onClick={this.props.handleChange("selectedStyle")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <hr />
        </div>
        <button
          className="btn btn-outline-dark m-3 float-left my-small-btn"
          onClick={this.back}
        >
          Back
        </button>
        <button
          className="btn btn-success m-3 float-right my-small-btn"
          onClick={this.continue}
        >
          Next
        </button>
      </React.Fragment>
    );
  }
}

export default Map;
