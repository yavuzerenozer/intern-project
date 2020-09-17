import React, { Component } from "react";
import { post2, postData } from "../api/apiCall";

class FinalMapTable extends Component {
  state = { isGenerated: 0, copySuccess: false, copySuccess2: false };

  back = (e) => {
    this.setState({ isGenerated: 0 });
    this.props.prevStep();
  };

  Call = () => {
    let data = {
      googleAPIKey: this.props.values.googleAPI,
      selectedMarker: parseInt(this.props.selectedMarker) + 1,
      selectedStyle: parseInt(this.props.selectedStyle) + 1,
      jotformAPIKey: this.props.values.japiKey,
      formID: this.props.values.selectedForm,
      labels: this.props.values.selectedLabel,
      addressQuestionID: this.props.values.selectedQuestion,
    };

    postData(data).then((response) => {
      this.props.handleMapKey(response.data.data);
      this.setState({ isGenerated: 1 });
    });
  };
  render() {
    const { generatedMapKey } = this.props.values;
    let btn_class = "btn btn-outline-secondary";
    let btn_class2 = "btn btn-outline-secondary";
    if (this.state.copySuccess) btn_class = "btn btn-outline-success";
    if (this.state.copySuccess2) btn_class2 = "btn btn-outline-success";
    if (this.state.isGenerated)
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
                <a
                  href={`https://jotform.com/${this.props.values.selectedForm}`}
                >
                  {this.props.values.selectedForm}
                </a>
              </p>
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
            class="btn btn-outline-success float-right m-3"
            type="button"
            onClick={() =>
              window.open(
                `http://localhost:3000/maps/${generatedMapKey}`,
                "_blank"
              )
            }
          >
            Open In New Tab
          </button>

          <div className="container">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                defaultValue={`http://localhost:3000/maps/${generatedMapKey}`}
                disabled
                aria-label="generatedmapkey"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button
                  value={generatedMapKey}
                  class={btn_class2}
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `http://localhost:3000/maps/${generatedMapKey}`
                    );
                    this.setState({ copySuccess2: true });
                  }}
                >
                  Copy!
                </button>
              </div>
            </div>

            <div class="input-group">
              <textarea
                class="form-control"
                aria-label="With textarea"
                defaultValue={`<iframe id="JotMapIFrame-${this.props.values.selectedForm}"  onload="window.parent.scrollTo(0,0)" allowtransparency="true" allowfullscreen="true" allow="geolocation;" src="http://localhost:3000/maps/${generatedMapKey}" frameborder="0" style=" min-width: 50%; height:500px; border:none;"></iframe>`}
              ></textarea>
              <div class="input-group-append">
                <button
                  value={generatedMapKey}
                  class={btn_class}
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<iframe id="JotMapIFrame-${this.props.values.selectedForm}"  onload="window.parent.scrollTo(0,0)" allowtransparency="true" allowfullscreen="true" allow="geolocation;" src="http://localhost:3000/maps/${generatedMapKey}" frameborder="0" style=" min-width: 50%; height:500px; border:none;"></iframe>`
                    );
                    this.setState({ copySuccess: true });
                  }}
                >
                  Copy!
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    ////////////else
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
        </div>

        <button
          className="btn btn-outline-dark m-3 float-left my-small-btn"
          onClick={this.back}
        >
          Back
        </button>

        <button
          className="btn btn-info m-3 float-right my-big-btn"
          onClick={this.Call}
        >
          Get Map
        </button>
      </React.Fragment>
    );
  }
}

export default FinalMapTable;
