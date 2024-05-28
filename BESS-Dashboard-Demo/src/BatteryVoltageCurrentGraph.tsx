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
      await fetch("http://192.168.0.2:1880/voltage_current")
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
              (props.height * 5) / 5 - 55,
              (props.height * 4) / 5 - 55,
              (props.height * 3) / 5 - 55,
              (props.height * 2) / 5 - 55,
              (props.height * 1) / 5 - 55,
            ]}
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={dateFormatter}
            tickCount={24}
          />
          <YAxis yAxisId="left" label="V" domain={[50, 55]} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label="A"
            domain={[-1, 1]}
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
  return new Date(d).toString();
}
