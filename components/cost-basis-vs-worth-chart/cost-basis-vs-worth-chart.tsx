import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { usePnl } from "../../hooks/use-pnl";

export function CostBasisVsWorthChart() {
  const { data, error, isLoading } = usePnl();
  if (isLoading) return <>..Loading</>;

  const barGraph = [
    {
      costBasis: data?.costBasis.dividedToIntegerBy(6).toNumber(),
      positionWorth: data?.positionWorth.dividedToIntegerBy(6).toNumber()
    }, 
  ];

  console.log('It is: ');
  console.log(barGraph);

  return (
    <>
      <BarChart width={730} height={250} data={barGraph}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="costBasis" fill="#8884d8" />
        <Bar dataKey="positionWorth" fill="#82ca9d" />
      </BarChart>
    </>
  );
}