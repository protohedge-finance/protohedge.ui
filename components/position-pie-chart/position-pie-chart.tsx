import BigNumber from "bignumber.js";
import { Pie, PieChart } from "recharts";

export function PositionPieChart() {
  const { data, error, isLoading } = useVault();

  if (isLoading) return <>Loading..</>;
  
  console.log('data is: ');
  console.log(data);

  const data03 = data?.map(d => ({
    name: d.symbol,
    value: d.amount.dividedBy(10**d.decimals).toNumber(),
  }));

  console.log(data03);

  return (
    <PieChart width={730} height={250}>
      <Pie data={data03} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label={position => {
        return `${position.name} (${new Number(position.percent * 100).toFixed(0)})%`
      }} />
    </PieChart>
  );
}