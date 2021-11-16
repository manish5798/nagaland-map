import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { features } from "../Data/data1.json";
import { dataColors } from "../dataColor";
import { ProgressBar, Row } from "react-bootstrap";
import { Colxx } from "../Common/CustomBootstrap";
import Table from "../Common/Table";
import Switch from "react-switch";
import { ExportToExcel } from "../ExportToExcel";
import { Card } from "reactstrap";
import BarChart from "../Common/BarChart";
import "./Map.css";
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDistrict: null,
      showProgress: true,
      filter: "Gender Equality",
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.length !== this.props.data.length) {
      this.setState(
        {
          data: [],
        },
        () => {
          this.setState({
            data: this.props.data,
          });
        }
      );
    }
  }

  onEachDistrict = (district, layer) => {
    const name = district.properties.distname;
    layer.options.weight = 1;
    layer.options.fillOpacity = 0.5;
    layer.options.color = "#fff";

    layer.options.fillColor = district.properties.color;

    // layer.bindTooltip(`${name}`);

    layer
      .bindTooltip(`${name}`, {
        permanent: true,
        className: "bg-transparent border-0 shadow-none",
        direction: "center",
      })
      .openTooltip();
    layer.on({
      click: () => {
        setTimeout(() => {}, 3000);
      },
      mouseover: () => {
        layer.setStyle({
          fillColor: "red",
          weight: 3,
        });
        this.setState({
          selectedDistrict: district.properties,
        });
      },
      mouseout: () => {
        layer.setStyle({
          fillColor: district.properties.color,
          weight: 1,
        });
        this.setState({
          selectedDistrict: null,
        });
      },
    });
  };
  render() {
    return (
      <>
        {this.state.data.length > 0 ? (
          <Row>
            <Colxx>
              <MapContainer
                style={{
                  height: "80vh",
                }}
                zoom={8}
                center={[
                  Math.round(
                    this.props.data[Math.round(this.props.data.length / 2)]
                      ?.geometry.coordinates[0][0][1]
                  ),
                  Math.round(
                    this.props.data[Math.round(this.props.data.length / 2)]
                      ?.geometry.coordinates[0][0][0]
                  ),
                ]}
              >
                <Row className="pl-4 mr-4">
                  <Colxx>
                    <div className="w-50 text-left d-flex flex-column justify-content-start align-items-start mt-4 ml-4 pl-4">
                      <h6 className="font-weight-bold">
                        {this.props.filter} | Total
                      </h6>
                      {this.state.selectedDistrict ? (
                        <>
                          <h6>{this.state.selectedDistrict.distname}</h6>
                          <h1 className="font-weight-bold">
                            {Number(this.state.selectedDistrict.distarea) / 100}
                          </h1>
                          <h6>%</h6>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </Colxx>
                </Row>

                <GeoJSON
                  data={this.state.data}
                  onEachFeature={this.onEachDistrict}
                />

                <Row className="w-100 position-absolute fixed-bottom">
                  <Colxx className="d-flex ml-2 justify-content-center align-items-center">
                    <div
                      className="bg-info"
                      style={{ width: "20px", height: "15px" }}
                    ></div>
                    <p className="pt-3 pl-1">Category1</p>
                  </Colxx>
                  <Colxx className="d-flex ml-2 justify-content-center align-items-center">
                    <div
                      className="bg-warning"
                      style={{ width: "20px", height: "15px" }}
                    ></div>
                    <p className="pt-3 pl-1">Category2</p>
                  </Colxx>
                  <Colxx className="d-flex ml-2 justify-content-center align-items-center">
                    <div
                      className="bg-danger"
                      style={{ width: "20px", height: "15px" }}
                    ></div>
                    <p className="pt-3 pl-1">Category3</p>
                  </Colxx>
                  <Colxx className="d-flex ml-2 justify-content-center align-items-center">
                    <div
                      className="bg-success"
                      style={{ width: "20px", height: "15px" }}
                    ></div>
                    <p className="pt-3 pl-1">Category4</p>
                  </Colxx>
                </Row>
              </MapContainer>
            </Colxx>
          </Row>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Map;
