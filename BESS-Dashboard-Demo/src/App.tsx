import "./App.css";
import Card from "./Card";
import { useEffect, useState } from "react";

interface inverterDataType {
  inverterStatus: string;
  chargerStatus: string;
  backupPower: number;
  throughput: number;
  temperature: number;
}

interface bmsDataType {
  soc: number;
  temperature: number;
}

function App() {
  // Initialize data, empty as it has not attempted to fetch data yet
  const [inverterData, setInverterData] = useState<inverterDataType>({
    inverterStatus: "None",
    chargerStatus: "None",
    backupPower: 0,
    throughput: 0,
    temperature: 0,
  });
  const [batteryData, setBMSData] = useState<bmsDataType>({
    soc: 0,
    temperature: 0,
  });

  useEffect(() => {
    const fetchData = async () =>
      await fetch("http://192.168.0.2:1880/inverterStatus")
        .then(async (response) => {
          console.log(response);
          return await response.json();
        })
        .then((result) => setInverterData(result));
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () =>
      await fetch("http://192.168.0.2:1880/bmsStatus")
        .then(async (response) => {
          console.log(response);
          return await response.json();
        })
        .then((result) => setBMSData(result));

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
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

export default App;
