import React, { Component } from "react";
import { Row, ProgressBar } from "react-bootstrap";
import { Card } from "reactstrap";
import ChartCard from "../Common/ChartCard";
import Select from "react-select";
import Table from "../Common/Table";
import { Colxx } from "../Common/CustomBootstrap";
import { ExportToExcel } from "../ExportToExcel";
class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: "District",
          accessor: "properties.distname",
        },
        {
          Header: "Progress",
          accessor: (row, rowIndex) => row,
          Cell: ({ cell: { value } }) => (
            <>
              {value && (
                <ProgressBar
                  variant="success"
                  now={value.properties.distarea / 100}
                />
              )}
            </>
          ),
        },
        {
          Header: "Male",
          accessor: "properties.totpopmale",
        },
        {
          Header: "Female",
          accessor: "properties.totpopfema",
        },
        {
          Header: "State",
          accessor: "properties.statename",
        },
        {
          Header: "Statecode",
          accessor: "properties.statecode",
        },
        {
          Header: "DistCode",
          accessor: "properties.distcode",
        },
        {
          Header: "Area",
          accessor: "properties.distarea",
        },
        {
          Header: "Population",
          accessor: "properties.totalpopul",
        },
        {
          Header: "ID",
          accessor: "properties.objectid",
        },
      ],
    };
  }

  componentDidMount() {
    this.handleChartData(this.props.dataSet);
  }

  handleChartData = (data) => {
    let label = [];
    let dd = [];
    let dataset = [];
    data.forEach((val) => {
      label.push(val.properties.distname);
      dd.push(Number(val.properties.distarea) / 100);
    });
    dataset.push({
      label: "Area",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: dd,
    });
    const dataDb = {
      labels: label,
      datasets: dataset,
    };

    this.setState({ data: dataDb });
  };

  render() {
    return (
      <>
        <Row className="justify-content-center mt-4">
          <Colxx sm="4"></Colxx>
          <Colxx sm="4" className="d-flex justify-content-center">
            <h2 className="font-weight-bold">REPORT</h2>
          </Colxx>
          <Colxx sm="4" className="d-flex justify-content-end">
            <div className="w-25">
              <ExportToExcel
                apiData={this.props.dataSet.map((report) => {
                  const { properties } = report;

                  let returnObj = {
                    District: properties.distname,
                    Area: properties.distarea,
                    Male: properties.totpopmale,
                    Female: properties.totpopfema,
                  };

                  return returnObj;
                })}
                fileName={"NagalandReport"}
              />
            </div>
          </Colxx>
        </Row>
        <Row className="mt-4 mx-2">
          <Colxx xs="12">
            <Card className="px-2 text-justify text-light bg-danger">
              <h4>SDG Goal 1. End poverty in all its forms everywhere</h4>
            </Card>
          </Colxx>
          <p className="mt-2 mx-3">
            Target SDG 1.2 By 2030, reduce at least by half the proportion of
            men, women and children of all ages living in poverty in all its
            dimensions according to national definitions{" "}
          </p>
        </Row>
        <Row>
          <Colxx lg="11" className="ml-4">
            <Row className="rounded">
              <Colxx lg="12">
                <Card>
                  {this.props.dataSet.length > 0 ? (
                    <Table
                      columns={this.state.columns}
                      data={this.props.dataSet}
                      noPagination={true}
                    />
                  ) : (
                    <></>
                  )}
                </Card>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <p className="mt-2 mx-4">
          Target SDG 1.4 By 2030, ensure that all men and women, in particular
          the poor and the vulnerable, have equal rights to economic resources,
          as well as access to basic services, ownership and control over land
          and other forms of property, inheritance, natural resources,
          appropriate new technology and financial services, including
          microfinance
        </p>
      </>
    );
  }
}

export default TableView;
