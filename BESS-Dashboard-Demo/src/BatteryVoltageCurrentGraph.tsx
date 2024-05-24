import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * TODO: Create MongoDB database and fill with dummy data.
 * Troubleshoot the connections and request powering the
 *   wall unit online to test out getting real data.
 */

const width = 730;
const height = 250;
const margin = { top: 5, right: 30, left: 20, bottom: 5 };
const data = [
  { name: 0, v: 51, a: 0 },
  { name: 1, v: 51, a: 0 },
  { name: 2, v: 52, a: 0 },
  { name: 3, v: 51.5, a: 12 },
  { name: 4, v: 51, a: -4 },
  { name: 5, v: 51, a: 0 },
];

export default function BatteryVoltageCurrentGraph() {
  return (
    <>
      <h2>Battery Voltage/Current</h2>
      <LineChart width={width} height={height} margin={margin} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Time" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="v" stroke="#888488" />
        <Line yAxisId="right" type="monotone" dataKey="a" stroke="#82cf9d" />
      </LineChart>
    </>
  );
}
