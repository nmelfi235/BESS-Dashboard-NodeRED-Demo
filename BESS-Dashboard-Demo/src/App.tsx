import "./App.css";
import BatteryVoltageCurrentGraph from "./BatteryVoltageCurrentGraph";
import CardArea from "./CardArea";

function App() {
  return (
    <>
      <h1>BESS Dashboard Clone</h1>
      <CardArea />
      <BatteryVoltageCurrentGraph />
    </>
  );
}

export default App;
