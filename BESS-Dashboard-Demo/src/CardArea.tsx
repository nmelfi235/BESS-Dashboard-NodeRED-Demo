import { bmsDataType, inverterDataType } from "./types";
import Card from "./Card";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CardArea() {
  // Initialize data, empty as it has not attempted to fetch data yet
  const [inverterData, setInverterData] = useState<inverterDataType>({});
  const [batteryData, setBMSData] = useState<bmsDataType>({});

  useEffect(() => {
    const fetchData = async () =>
      await fetch("http://192.168.0.2:1880/inverterStatus")
        .then(async (response) => {
          return await response.json();
        })
        .then((result) => setInverterData(result));

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () =>
      await fetch("http://192.168.0.2:1880/bmsStatus")
        .then(async (response) => {
          return await response.json();
        })
        .then((result) => setBMSData(result));

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }} className="container-fluid card-area">
        <Card Name="Inverter Status" Icon="...">
          {inverterData.inverterStatus}
          <p>{inverterData.chargerStatus}</p>{" "}
        </Card>
        <Card Name="Backup Power" Icon="...">
          {inverterData.backupPower}
        </Card>
        <Card Name="Battery Throughput" Icon="...">
          {inverterData.throughput}{" "}
        </Card>
        <Card Name="SOC" Icon="...">
          {batteryData.soc}
        </Card>
        <Card Name="Battery Temperature" Icon="...">
          {batteryData.temperature}
        </Card>
        <Card Name="Ambient Temperature" Icon="...">
          {inverterData.temperature}{" "}
        </Card>
      </div>
    </>
  );
}

export default CardArea;
