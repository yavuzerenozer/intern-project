import React, { Component, Suspense, lazy } from "react";
import Confirm from "./confirmation";
import DemoMap from "../map/demo_map";
import StyledMap from "./../map/styled_map";
import Map from "../map/map";
import { fetchWithDelay } from "../api/apiCall";
import Loader from "react-loader-spinner";
import Navbar from "./../home/navbar";
import FinalMapTable from "../map/final_map_table";
import FinalMap from "./../map/final_map";
const FormSelector = lazy(() => import("./formselector")); //lazy import

//LOADING COMPONENT
const LoadingIndicator = (props) => {
  const { values, handleChange, nextStep } = props;
  if (values.isLoading) {
    return (
      <div className="d-flex justify-content-center margin-loading">
        <Loader
          type="ThreeDots"
          color="#18265b"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center margin-loading">
          <Loader
            type="ThreeDots"
            color="#5CB85C"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      }
    >
      <FormSelector
        values={values}
        handleChange={handleChange}
        nextStep={nextStep}
      />
    </Suspense>
  );
};

class Steps extends Component {
  state = {
    step: 1,
    selectedForm: "",
    questions: [],
    form_list: [],
    googleAPI: "",
    japiKey: "",
    selectedQuestion: "",
    selectedMarker: "0",
    selectedStyle: "0",
    selectedLabel: "",
    addresses: [],
    labels: [],
    generatedMapKey: "",
    isLoading: 1,
  };

  componentDidMount() {
    this.setState({ japiKey: window.japiKey });
    fetchWithDelay(window.japiKey).then((response) => {
      setTimeout(() => {
        let questions = [];
        for (let i in response) {
          let question = {
            id: response[i].value_form_id,
            questions: response[i].questions,
          };
          questions.push(question);
        }
        this.setState({
          form_list: response,
          isLoading: 0,
          questions: questions,
        });
      }, 350);
    });
  }

  //go to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  //back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleQuestions = (questions) => {
    this.setState({ questions });
  };

  handleAddresses = (addresses) => {
    this.setState({ addresses });
  };

  handleLabels = (labels) => {
    this.setState({ labels });
  };

  handleMapKey = (mapKey) => {
    this.setState({ generatedMapKey: mapKey });
  };

  render() {
    const {
      step,
      selectedForm,
      questions,
      googleAPI,
      selectedQuestion,
      selectedLabel,
      required,
      addresses,
      labels,
      isLoading,
      form_list,
      japiKey,
    } = this.state;
    const values = {
      step,
      selectedForm,
      questions,
      googleAPI,
      selectedQuestion,
      selectedLabel,
      required,
      addresses,
      labels,
      isLoading,
      form_list,
      japiKey,
    };
    switch (step) {
      case 1:
        if (this.props.isLoggedIn) {
          return (
            <React.Fragment>
              <div className="container mt-5">
                <Navbar />
                <div className="container">
                  <div className="row mt-5">
                    <div className="col">
                      <LoadingIndicator
                        handleChange={this.handleChange}
                        values={values}
                        nextStep={this.nextStep}
                      />
                    </div>
                    <div className="col">
                      <DemoMap handleChange={this.handleChange} />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        } else window.top.location.replace("http://localhost:3000/");
        break;
      case 2:
        return (
          <React.Fragment>
            <div className="container mt-5">
              <Navbar />
              <div className="container">
                <div className="row mt-5">
                  <div className="col">
                    <Confirm
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      handleChange={this.handleChange}
                      handleQuestionChange={this.handleQuestions}
                      values={values}
                    />
                  </div>
                  <div className="col">
                    <DemoMap handleChange={this.handleChange} />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );

      case 3:
        return (
          <React.Fragment>
            <div className="container mt-5">
              <Navbar />
              <div className="container">
                <div className="row mt-5">
                  <div className="col">
                    <Map
                      handleChange={this.handleChange}
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      values={values}
                      handleAddresses={this.handleAddresses}
                      handleLabels={this.handleLabels}
                      selectedMarker={this.state.selectedMarker}
                      selectedStyle={this.state.selectedStyle}
                    />
                  </div>
                  <div className="col">
                    <StyledMap
                      selectedMarker={this.state.selectedMarker}
                      selectedStyle={this.state.selectedStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      case 4:
        return (
          <React.Fragment>
            <div className="container mt-5">
              <Navbar />
              <div className="container">
                <div className="row mt-5">
                  <div className="col">
                    <FinalMapTable
                      values={values}
                      prevStep={this.prevStep}
                      handleMapKey={this.handleMapKey}
                      selectedMarker={this.state.selectedMarker}
                      selectedStyle={this.state.selectedStyle}
                    />
                  </div>
                  <div className="col">
                    <FinalMap
                      selectedMarker={this.state.selectedMarker}
                      selectedStyle={this.state.selectedStyle}
                      values={values}
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
    }
  }
}

export default Steps;
