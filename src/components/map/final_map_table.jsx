import React, { Component } from "react";
import { post2, postData } from "../api/apiCall";

class FinalMapTable extends Component {
  back = (e) => {
    this.props.prevStep();
  };

  Call = () => {
    let data = {
      googleAPIKey: this.props.values.googleAPI,
      selectedMarker: this.props.selectedMarker,
      selectedStyle: this.props.selectedStyle,
      jotformAPIKey: this.props.values.japiKey,
      formID: this.props.values.selectedForm,
      labels: this.props.values.selectedLabel,
      addressQuestionID: this.props.values.selectedQuestion,
    };
    postData(data).then((response) => {
      console.log(response);
      this.props.handleMapKey(response.data.data);
    });
  };
  render() {
    const { labels, addresses } = this.props.values;
    const label_text = labels[labels.length - 1];
    const labels_addresses = [];
    for (let i = 0; i < labels.length; i++) {
      let label = {
        label: labels[i].label,
      };
      labels_addresses.push([label]);
    }
    addresses.sort(function (a, b) {
      return a.formatted_address > b.formatted_address
        ? 1
        : b.formatted_address > a.formatted_address
        ? -1
        : 0;
    });
    for (let i = 0; i < addresses.length; i++) {
      let address = {
        address: addresses[i].formatted_address,
        coordinates: { lat: addresses[i].lat, lng: addresses[i].lng },
      };
      labels_addresses[i].push(address);
    }
    labels_addresses.pop();

    return (
      <React.Fragment>
        <div className="usercontainer container">
          <h3 className="userheading">Your JotMap Data</h3>
          <div className="row">
            <p className="userp col-md-auto">User:</p>
            <p className="useri col column-overflow">{window.jusername}</p>
          </div>
          <div className="row">
            <p className="userp col-md-auto">API Key:</p>
            <p className="useri col column-overflow">{window.japiKey}</p>
          </div>
          <div className="row">
            <p className="userp col-md-auto">Form ID:</p>
            <p className="useri col column-overflow">
              {this.props.values.selectedForm}
            </p>
          </div>

          <hr />

          <div className="table-container-3">
            <table className="table">
              <thead className="thead-dark align-items-center justify-content-center">
                <tr>
                  <th scope="col col-width align-items-center justify-content-center">
                    {label_text}
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
                {labels_addresses.map((element) => {
                  return (
                    <tr
                      key={element[1].coordinates.lat}
                      className="align-items-center"
                    >
                      <td className="align-items-center justify-content-center col-width">
                        {element[0].label}
                      </td>
                      <td className="align-items-center justify-content-center col-width">
                        {element[1].address}
                      </td>
                      <td className="align-items-center justify-content-center col-width">
                        ({element[1].coordinates.lat},{" "}
                        {element[1].coordinates.lng})
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
          className="btn btn-info m-3 float-right my-small-btn"
          onClick={this.Call}
        >
          Get Your Map
        </button>
      </React.Fragment>
    );
  }
}

export default FinalMapTable;
