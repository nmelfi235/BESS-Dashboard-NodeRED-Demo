import { bmsDataType, inverterDataType } from "./types";
import Card from "./Card";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const fetchData = async (url: string) =>
  await fetch("http://192.168.0.2:1880" + url).then(async (response) => {
    return await response.json();
  });

function CardArea() {
  // Initialize data, empty as it has not attempted to fetch data yet
  const [inverterData, setInverterData] = useState<inverterDataType>({});
  const [batteryData, setBMSData] = useState<bmsDataType>({});

  useEffect(() => {
    const getData = async (url: string) =>
      await fetchData(url).then((result) => setInverterData(result));

    getData("/inverter");
  }, []);

  return (
    <>
      <div style={{ display: "flex" }} className="container-fluid card-area">
        <Card Name="Inverter Status" Icon="...">
          {inverterData.inverterStatus}
          <p>{inverterData.chargerStatus}</p>{" "}
        </Card>
        <Card Name="Backup Power" Icon="...">
          {inverterData.ACLoadPower?.toFixed(2)} kW
        </Card>
        <Card Name="Battery Throughput" Icon="...">
          {inverterData.energyLifetime?.toFixed(2)} kWh{" "}
        </Card>
        <Card Name="SOC" Icon="...">
          {batteryData.soc}
        </Card>
        <Card Name="Battery Temperature" Icon="...">
          {batteryData.temperature}
        </Card>
        <Card Name="Ambient Temperature" Icon="...">
          {inverterData.temperature?.toFixed(2)} C{" "}
          <p>
            {((Number(inverterData.temperature) * 9) / 5 + 32).toFixed(2)} F{" "}
          </p>
        </Card>
      </div>
    </>
  );
}

export default CardArea;
