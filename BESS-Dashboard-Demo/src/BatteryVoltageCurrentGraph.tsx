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
const data = [
  { name: 0, V: 51, A: 0 },
  { name: 1, V: 51, A: 0 },
  { name: 2, V: 52, A: 0 },
  { name: 3, V: 51.5, A: 12 },
  { name: 4, V: 51, A: -4 },
  { name: 5, V: 51, A: 0 },
];

export default function BatteryVoltageCurrentGraph() {
  return (
    <>
      <h2>Battery Voltage/Current</h2>
      <ResponsiveContainer width={width} height={height}>
        <LineChart margin={margin} data={data} className="container-fluid">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="V" stroke="#888488" />
          <Line yAxisId="right" type="monotone" dataKey="A" stroke="#82cf9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
