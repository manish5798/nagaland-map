import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { features } from "./data1.json";
import { dataColors } from "./dataColor";
import Header from "./Navbar";
import { ProgressBar, Row } from "react-bootstrap";
import { Colxx } from "./CustomBootstrap";
import Table from "./Table";
import Switch from "react-switch";
function MapPage() {
  const [selectedName, setSelectedName] = useState("");
  const [showProgress, setShowProgress] = useState(true);
  // eslint-disable-next-line
  const [columns, setColumns] = useState([
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
  ]);

  useEffect(() => {}, [showProgress]);

  const onEachDistrict = (district, layer) => {
    const name = district.properties.distname;
    layer.options.weight = 1;
    layer.options.fillOpacity = 0.5;
    layer.options.color = "#fff";

    layer.options.fillColor = dataColors[name];

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
        setSelectedName(district.properties.distname);
      },
      mouseout: () => {
        layer.setStyle({
          fillColor: dataColors[name],
          weight: 1,
        });
        setSelectedName("");
      },
    });
  };

  return (
    <div className="">
      <Header />
      <h2 className="mt-2 text-center font-weight-bold">NAGALAND</h2>
      <hr />
      <div className="d-flex flex-column flex-sm-row">
        <Colxx sm="6">
          <MapContainer
            style={{
              height: "60vh",
            }}
            className="mx-0 mx-sm-4"
            zoom={8}
            center={[26.2, 94.5]}
          >
            <div className="w-50 text-left d-flex flex-column justify-content-start align-items-center mt-2">
              <p className="font-weight-bold">District Details</p>
              {selectedName ? <strong>{selectedName}</strong> : ""}
            </div>
            <GeoJSON data={features} onEachFeature={onEachDistrict} />
          </MapContainer>
        </Colxx>
        <Colxx sm="6">
          <div className="d-flex ml-2">
            <p>Show Progress</p>
            <Switch
              height={20}
              width={48}
              onChange={(e) => {
                setShowProgress(e);
              }}
              className="mt-1 ml-2"
              checked={showProgress}
            />
          </div>
          <Row className="rounded">
            <Colxx lg="12" height="60vh">
              {console.log(
                showProgress,
                "dddddddd",
                showProgress
                  ? columns
                  : columns.slice(0, 1).concat(columns.slice(2, 4))
              )}
              <Table
                columns={
                  showProgress
                    ? columns
                    : columns.slice(0, 1).concat(columns.slice(2, 4))
                }
                data={features}
                noPagination={true}
              />
            </Colxx>
          </Row>
        </Colxx>
      </div>
    </div>
  );
}
export default MapPage;
