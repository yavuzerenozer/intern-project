import React, { Component } from "react";
import { getData } from "../api/apiCall";
import Loader from "react-loader-spinner";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import styles from "../map/styles.json";

class Maps extends Component {
  state = {
    isLoading: 1,
    labels: [],
    selectedMarker: "0",
    selectedStyle: 1,
    formID: "",
    googleAPIKey: "",
    heatmap: parseInt(this.props.match.params.mapType),
  };
  componentDidMount() {
    getData(this.props.match.params.mapID).then((response) => {
      let result = response.data;
      let labels = [];
      for (let i = 0; i < result.pins.length; i++) {
        let label = {
          coordinates: result.pins[i].coordinates,
          labels: result.pins[i].labels,
          show: false,
        };
        labels.push(label);
      }
      let selectedMarker = parseInt(result.selectedMarker) - 1;
      let selectedStyle = parseInt(result.selectedStyle) - 1;
      this.setState({
        labels,
        selectedMarker,
        selectedStyle,
        formID: result.formID,
        isLoading: 0,
        googleAPIKey: result.googleAPIKey,
      });
    });
  }

  onChildClickCallback = (key) => {
    this.setState((state) => {
      const index = state.labels.findIndex((e) => e.coordinates.lat === key);
      state.labels[index].show = !state.labels[index].show; // eslint-disable-line no-param-reassign
      return { labels: state.labels };
    });
  };
  handleRowClick = (key) => {
    this.setState((state) => {
      const index = state.labels.findIndex((e) => e.coordinates.lat === key);
      state.labels[index].show = !state.labels[index].show; // eslint-disable-line no-param-reassign
      return { labels: state.labels };
    });
  };
  handleHeatmap = () => {
    let status = !this.state.heatmap;
    this.setState({ heatmap: status });
  };

  render() {
    if (this.state.isLoading)
      return (
        <div className="d-flex justify-content-center margin-loading">
          <Loader
            type="ThreeDots"
            color="#18265b"
            height={100}
            width={100}
            timeout={10000} //10 secs
          />
        </div>
      );
    ///RETURNS HEATMAP
    else if (this.state.heatmap === 1) {
      const { labels } = this.state;
      const data = labels.map((place) => ({
        lat: place.coordinates.lat,
        lng: place.coordinates.lng,
        weight: 1,
      }));
      const heatmapData = {
        positions: data,
        options: {
          radius: 20,
          opacity: 1,
        },
      };
      const mapOptions = {
        styles: styles.styles[parseInt(this.state.selectedStyle)], // straight out of something like snazzymaps
      };
      const center = {
        lat: parseFloat(this.state.labels[0].coordinates.lat),
        lng: parseFloat(this.state.labels[0].coordinates.lng),
      };
      return (
        <React.Fragment>
          <div className="row no-gutters">
            <div className="col-4 padding-0">
              <div className="table-container-4 tableFixHead ">
                <table className="table table-hover">
                  <thead className="thead-dark align-items-center justify-content-center">
                    <tr>
                      <th scope="col col-width align-items-center justify-content-center">
                        {this.state.labels[0].labels[0].text}
                      </th>
                      <th scope="col col-width align-items-center justify-content-center">
                        Address
                      </th>
                      <th scope="col col-width align-items-center justify-content-center">
                        Coordinates
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-items-center justify-content-center">
                    {this.state.labels.map((element) => {
                      return (
                        <tr
                          key={element.coordinates.lat}
                          style={{ cursor: "pointer" }}
                          className="clickable-row"
                          onClick={() => {
                            this.handleRowClick(element.coordinates.lat);
                          }}
                        >
                          <td className="align-items-center justify-content-center col-width">
                            {element.labels[0].answer}
                          </td>
                          <td className="align-items-center justify-content-center col-width">
                            {element.coordinates.fullAddress}
                          </td>
                          <td className="align-items-center justify-content-center col-width">
                            ({element.coordinates.lat},{" "}
                            {element.coordinates.lng})
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-8 padding-0">
              <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                  defaultZoom={6}
                  defaultCenter={center}
                  heatmap={heatmapData}
                  bootstrapURLKeys={{
                    key: this.state.googleAPIKey,
                    libraries: ["visualization"],
                  }}
                  options={mapOptions}
                >
                  <button
                    style={{
                      position: "relative",
                      bottom: 475,
                      left: -620,
                      width: 100,
                    }}
                    className="btn btn-danger"
                    onClick={() => {
                      window.top.location.replace(
                        `http://localhost:3000/maps/${this.props.match.params.mapID}`
                      );
                    }}
                  >
                    Heatmap
                  </button>
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      const center = {
        lat: parseFloat(this.state.labels[0].coordinates.lat),
        lng: parseFloat(this.state.labels[0].coordinates.lng),
      };
      const key = { key: this.state.googleAPIKey };
      const mapOptions = {
        styles: styles.styles[parseInt(this.state.selectedStyle)], // straight out of something like snazzymaps
      };
      return (
        <React.Fragment>
          <div className="row no-gutters">
            <div className="col-4 padding-0">
              <div className="table-container-4 tableFixHead ">
                <table className="table table-hover">
                  <thead className="thead-dark align-items-center justify-content-center">
                    <tr>
                      <th scope="col col-width align-items-center justify-content-center">
                        {this.state.labels[0].labels[0].text}
                      </th>
                      <th scope="col col-width align-items-center justify-content-center">
                        Address
                      </th>
                      <th scope="col col-width align-items-center justify-content-center">
                        Coordinates
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-items-center justify-content-center">
                    {this.state.labels.map((element) => {
                      return (
                        <tr
                          key={element.coordinates.lat}
                          style={{ cursor: "pointer" }}
                          className="clickable-row"
                          onClick={() => {
                            this.handleRowClick(element.coordinates.lat);
                          }}
                        >
                          <td className="align-items-center justify-content-center col-width">
                            {element.labels[0].answer}
                          </td>
                          <td className="align-items-center justify-content-center col-width">
                            {element.coordinates.fullAddress}
                          </td>
                          <td className="align-items-center justify-content-center col-width">
                            ({element.coordinates.lat},{" "}
                            {element.coordinates.lng})
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-8 padding-0">
              <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: this.state.googleAPIKey,
                    libraries: ["visualization"],
                  }}
                  defaultCenter={center}
                  defaultZoom={6}
                  options={mapOptions}
                  onChildClick={this.onChildClickCallback}
                >
                  {this.state.labels.map((coords) => (
                    <Marker
                      key={coords.coordinates.lat}
                      lat={parseFloat(coords.coordinates.lat)}
                      lng={parseFloat(coords.coordinates.lng)}
                      selectedMarker={this.state.selectedMarker}
                      show={coords.show}
                      data={coords.labels[0]}
                      fullAddress={coords.coordinates.fullAddress}
                    />
                  ))}
                  <button
                    style={{
                      position: "relative",
                      bottom: 475,
                      left: -620,
                      width: 100,
                    }}
                    className="btn btn-danger"
                    onClick={() => {
                      window.top.location.replace(
                        `http://localhost:3000/maps/${this.props.match.params.mapID}/1`
                      );
                    }}
                  >
                    Heatmap
                  </button>
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Maps;
