import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import { features } from "../Data/data1.json";
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";
import Map from "../Map/Map";
import DashView from "../Body/DashView";
import TableView from "../Body/TableView";
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: "",
      showProgress: true,
      states: [],
      selectedState: {
        label: "Uttarakhand",
        value: "Uttarakhand",
      },
      filter: "Gender Equality",
      viewFilter: localStorage.getItem("display")
        ? localStorage.getItem("display")
        : "Dashboard",
      data: [],
      chartData: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        data: [],
      },
      () => {
        this.setState({
          data: features,
          showProgress: event,
        });
      }
    );
  }

  componentDidMount() {
    let stateSet = new Set();

    features.forEach((obj) => {
      stateSet.add(obj.properties.statename);
    });

    let states = [...stateSet];
    this.setState({
      data: features,
      states: states,
    });
  }

  render() {
    return (
      <div className="">
        {this.state.data.length > 0 ? (
          <>
            <Header
              filter={this.state.filter}
              setFilter={(value) => {
                this.setState({
                  filter: value,
                });
              }}
            />
            <SubHeader
              setView={(val) => {
                this.setState({
                  viewFilter: val,
                });
                localStorage.setItem("display", val);
              }}
              viewFilter={this.state.viewFilter}
              states={this.state.states}
              selectedState={this.state.selectedState}
              setStateName={(val) => {
                this.setState({
                  selectedState: val,
                });
              }}
            />
            <hr className="mt-0" />
            {this.state.viewFilter === "Dashboard" ? (
              <>
                
                <Map
                  filter={this.state.filter}
                  data={features.filter(
                    (val) =>
                      val.properties.statename ===
                      this.state.selectedState.value
                  )}
                />
                <DashView
                  dataSet={features.filter(
                    (val) =>
                      val.properties.statename ===
                      this.state.selectedState.value
                  )}
                />
              </>
            ) : (
              <TableView
                dataSet={features.filter(
                  (val) =>
                    val.properties.statename === this.state.selectedState.value
                )}
              />
            )}
          </>
        ) : (
          <>
            <div className="loading"></div>
          </>
        )}
      </div>
    );
  }
}

export default DashBoard;
