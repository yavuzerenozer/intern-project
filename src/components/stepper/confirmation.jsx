import React, { Component } from "react";

class Confirm extends Component {
  handleDisable = () => {
    if (this.props.values.selectedQuestion !== "")
      this.props.values.required = true;
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const questions = this.props.values.questions.filter(
      (question) => question.id === this.props.values.selectedForm
    );
    const labels = questions[0].questions.filter(
      (question) => question.type !== "control_address"
    );
    const addresses = questions[0].questions.filter(
      (question) => question.type === "control_address"
    );
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
          <h3 className="userheading mt-4">Step 2</h3>
          <p className="userp">
            <i className="fa fa-map-marker" aria-hidden="true"></i> Select an
            address field for the pin.
          </p>
          <hr />
          <div className="table-container-2">
            <table className="table table-borderless">
              <tbody>
                {addresses.map((element) => {
                  let checked = false;
                  let lclass = "form-check-label ml-3 table-active1";
                  if (this.props.values.selectedQuestion === element.qid)
                    checked = true;
                  this.handleDisable();
                  return (
                    <tr key={element.qid}>
                      <td>
                        <label className={lclass + " container container-1"}>
                          {element.text}
                          <input
                            key={element.qid}
                            type="radio"
                            name="question-selector"
                            id={element.qid}
                            value={element.qid}
                            defaultChecked={checked}
                            onClick={this.props.handleChange(
                              "selectedQuestion"
                            )}
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

        <div className="container ">
          <p className="userp ">
            <i className="fa fa-tag" aria-hidden="true"></i> Select a label for
            the pin.
          </p>

          <hr />
          <div className="table-container-2">
            <table className="table table-borderless">
              <tbody>
                {labels.map((element) => {
                  let checked = false;
                  let lclass = "form-check-label ml-3 table-active1";
                  if (this.props.values.selectedLabel === element.qid)
                    checked = true;
                  this.handleDisable();
                  return (
                    <tr key={element.qid}>
                      <td>
                        <label className={lclass + " container container-1"}>
                          {element.text}
                          <input
                            key={element.qid}
                            type="radio"
                            name="label-selector"
                            defaultChecked={checked}
                            id={element.qid}
                            value={element.qid}
                            onClick={this.props.handleChange("selectedLabel")}
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
          disabled={!this.props.values.required}
        >
          Next
        </button>
      </React.Fragment>
    );
  }
}

export default Confirm;
