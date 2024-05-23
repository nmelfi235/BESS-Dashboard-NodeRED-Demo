import "./App.css";
import Card from "./Card";

interface inverterDataType {
  inverterStatus: string,
  chargerStatus: string,
  backupPower: number,
  throughput: number,
  temperature: number
}

interface bmsDataType {
  soc: number,
  temperature: number
}

async function App() {
  const inverterData = await getData<inverterDataType>('inverterStatus');
  const batteryData = await getData<bmsDataType>('bmsStatus');

  return (
    <>
      <div style={{ display: "flex" }}>
        <Card Name="Inverter Status" Icon="...">{inverterData.inverterStatus ? "<p>" + await inverterData.inverterStatus + "</p>" : "<p>No Data</p>"}{inverterData.chargerStatus ? "<p>" + await inverterData.chargerStatus + "</p>" : "<p>No Data</p>"} </Card>
        <Card Name="Backup Power" Icon="...">{inverterData.backupPower ? inverterData.backupPower : "No Data"}</Card>
        <Card Name="Battery Throughput" Icon="...">{inverterData.throughput ? inverterData.throughput : "No Data"} </Card>
        <Card Name="SOC" Icon="...">{batteryData.soc ? batteryData.soc : "No Data"}</Card>
        <Card Name="Battery Temperature" Icon="...">{batteryData.temperature ? batteryData.temperature : "No Data"}</Card>
        <Card Name="Ambient Temperature" Icon="...">{String(inverterData.temperature)} </Card>
        </div>
    </>
  );
}

async function getData<i>(endpoint : string) : Promise<i> {
  const data = await fetch('192.168.0.2/' + endpoint);
  const data_1 = await data.json();
  return await (data_1 as i);
}

export default App;
