import React, { Component } from "react";

class FormSelector extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  handleDisable = () => {
    if (
      this.props.values.selectedForm !== "" &&
      this.props.values.googleAPI !== ""
    )
      this.props.values.required = true;
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <React.Fragment>
        <div className="usercontainer container">
          <h3 className="userheading">Your JotMap Data</h3>
          <div className="row">
            <p className="userp col-md-auto">User:</p>
            <p className="useri col-md-auto column-overflow">
              {window.jusername}
            </p>
          </div>
          <hr />
          <h3 className="userheading mt-3">Step 1</h3>
          <p className="userp">
            Select a form and provide a{" "}
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps API key
            </a>
            .
          </p>

          <input
            type="text"
            className="form-control mt-1 mb-3"
            id="formInput"
            placeholder="Google Maps API Key"
            defaultValue={values.googleAPI}
            onChange={this.props.handleChange("googleAPI")}
          ></input>
          <hr />
          <h3 className="userheading mt-3">Step 2</h3>
          <p className="userp">
            Select a form
          </p>
          <div className="table-container">
            <table className="table table-borderless">
              <tbody>
                {values.form_list.map((element) => {
                  const addressavailable = element.questions.filter(
                    (question) => question.type === "control_address"
                  ).length;
                  let checked = false;
                  let submissions =
                    parseInt(element.submissions) && addressavailable;
                  if (values.selectedForm === element.value_form_id)
                    checked = true;
                  let muted = "text-muted";
                  let lclass = "form-check-label ml-3 ";
                  let pclass = "float-right mr-3 ";
                  if (!submissions) {
                    lclass += muted;
                    pclass += muted;
                  } else {
                    lclass += "table-active1";
                    pclass += "table-active1";
                  }
                  this.handleDisable();
                  return (
                    <tr key={element.value_form_id} className="ml-4 margin-row">
                      <td>
                        <label className={lclass + " container container-1"}>
                          <input
                            key={element.value_form_id}
                            type="radio"
                            name="form-input"
                            id={element.value_form_id}
                            value={element.value_form_id}
                            defaultChecked={checked}
                            disabled={!submissions}
                            onClick={handleChange("selectedForm")}
                          />
                          <span className="checkmark"></span>
                          {element.title}
                        </label>
                      </td>
                      <td>
                        <p className={pclass}>
                          {element.submissions} submissions
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="d-flexcol mt-2 float-right">
            <button
              onClick={this.continue}
              className="btn btn-success my-small-btn mt-2"
              disabled={!this.props.values.required}
            >
              Next
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FormSelector;
