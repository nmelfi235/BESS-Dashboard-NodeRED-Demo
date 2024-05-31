import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * TODO: Create MongoDB database and fill with dummy data.
 * Troubleshoot the connections and request powering the
 *   wall unit online to test out getting real data.
 */

const width = "95%";
const height = 300;
const margin = { top: 5, right: 30, left: 20, bottom: 5 };

export default function BatteryVoltageCurrentGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () =>
      await fetch("http://192.168.0.2:1880/inverter/voltage_current_graph")
        .then(async (response) => {
          return await response.json();
        })
        .then((result) => setData(result));

    fetchData();
  }, []);

  return (
    <>
      <h2>Battery Voltage/Current</h2>
      <ResponsiveContainer width={width} height={height}>
        <LineChart margin={margin} data={data} className="container-fluid">
          <CartesianGrid
            strokeDasharray="3 3"
            horizontalCoordinatesGenerator={(props) => [
              (props.height * 6) / 6 - 55,
              (props.height * 5) / 6 - 55,
              (props.height * 4) / 6 - 55,
              (props.height * 3) / 6 - 55,
              (props.height * 2) / 6 - 55,
              (props.height * 1) / 6 - 55,
            ]}
            verticalCoordinatesGenerator={(props) => [
              (props.width * 6) / 6,
              (props.width * 5) / 6,
              (props.width * 4) / 6,
              (props.width * 3) / 6,
              (props.width * 2) / 6,
              (props.width * 1) / 6,
            ]}
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={dateFormatter}
            interval={"equidistantPreserveStart"}
            tickCount={4}
          />
          <YAxis
            yAxisId="left"
            label="V"
            domain={["dataMin - (dataMin / 2)", "dataMax + (dataMax * 2)"]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label="A"
            domain={["dataMin - (dataMin / 2)", "dataMax + (dataMax * 2)"]}
          />
          <Tooltip
            labelFormatter={dateFormatter}
            content={({ active, payload, label }) =>
              active &&
              payload &&
              payload.length && (
                <div className="graphToolTip">
                  <p className="toolTipLabel">{`${dateFormatter(label)}}`}</p>
                  <p className="toolTipValue">
                    Voltage: {Number(payload[0].value).toFixed(2)} V
                  </p>
                  <p className="toolTipValue">
                    Current: {Number(payload[1].value).toFixed(2)} A
                  </p>
                </div>
              )
            }
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="voltage"
            stroke="#888488"
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="current"
            stroke="#82cf9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function dateFormatter(d: number): string {
  const newDate = new Date(d);
  return `[${newDate.getMonth()}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}]`;
}
