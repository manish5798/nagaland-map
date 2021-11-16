import React from "react";
import "./Header.css";
import { Row } from "react-bootstrap";
import { Colxx } from "../Common/CustomBootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faChartLine } from "@fortawesome/free-solid-svg-icons";

export default class SubHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: {
        label: "Most Recent",
        value: "Most Recent",
      },
    };
  }
  handleChangeYear = (val) => {
    this.setState({ selectedYear: val });
  };
  render() {
    return (
      <Row>
        <Colxx sm="4"></Colxx>
        <Colxx sm="4">
          <Row>
            <Colxx sm="6">
              <div className="form-group">
                <Select
                  options={this.props.states
                    .map((state) => {
                      return {
                        label: state,
                        value: state,
                      };
                    })}
                  value={this.props.selectedState}
                  onChange={(data) => {
                    this.props.setStateName(data);
                  }}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </div>
            </Colxx>
            <Colxx sm="6">
              <div className="form-group">
                <Select
                  options={[
                    {
                      label: "Most Recent",
                      value: "Most Recent",
                    },
                    {
                      label: "2020",
                      value: "2020",
                    },
                    {
                      label: "2019",
                      value: "2019",
                    },
                  ]}
                  value={this.state.selectedYear}
                  onChange={(data) => {
                    this.handleChangeYear(data);
                  }}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </div>
            </Colxx>
          </Row>
        </Colxx>
        <Colxx sm="3" className="d-flex justify-content-end align-items-center">
          <div className="border-right border-info p-1">
            <FontAwesomeIcon
              icon={faChartLine}
              className={this.props.viewFilter === "Dashboard" ? "view" : ""}
              style={{
                width: "32px",
                height: "28px",
                cursor: "pointer",
                opacity: 0.7,
              }}
              onClick={() => {
                this.props.setView("Dashboard");
              }}
            />
            {/* <img
              className="view"
              style={{ width: "32px", height: "28px", cursor: "pointer" }}
              src={DashView}
              alt=""
              data-toggle="tooltip"
              data-placement="bottom"
              title="Dashboard"
              onClick={() => {
                this.props.setView("Dashboard");
              }}
            /> */}
          </div>
          <div className="p-1">
            {" "}
            <FontAwesomeIcon
              icon={faTable}
              className="view"
              style={{
                width: "32px",
                height: "28px",
                cursor: "pointer",
                opacity: 0.7,
              }}
              // eslint-disable-next-line
              className={this.props.viewFilter === "Table" ? "view" : ""}
              onClick={() => {
                this.props.setView("Table");
              }}
            />
            {/* <img
              className="view"
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              src={TableView}
              alt=""
              data-toggle="tooltip"
              data-placement="bottom"
              title="Report"
              onClick={() => {
                this.props.setView("Table");
              }}
            /> */}
          </div>
        </Colxx>
      </Row>
    );
  }
}
