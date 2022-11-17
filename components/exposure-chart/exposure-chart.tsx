import BigNumber from "bignumber.js";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Vault } from '../../types/vault';

interface ExposureChartProps {
  vault: Vault;
}

export function ExposureChart(props: ExposureChartProps) {
  const initialExposures: {[key: string]: { longExposure: BigNumber, shortExposure: BigNumber }} = {};

  const exposures = Object.entries(props.vault.positionManagers.reduce((current, position) => {
    position.tokenExposures.forEach(exposure => {
       
      if (exposure.token.toLowerCase() !== process.env.btcAddress?.toLowerCase() && exposure.token.toLowerCase() !== process.env.ethAddress?.toLowerCase()) return;
      if (!current[exposure.symbol]) {
        current[exposure.symbol] = {
          longExposure: new BigNumber(0),
          shortExposure: new BigNumber(0),
        };
      }
      
      if (exposure.amount.gt(0)) {
        current[exposure.symbol].longExposure = current[exposure.symbol].longExposure.plus(exposure.amount);
      } else if (exposure.amount.lt(0)) {
        current[exposure.symbol].shortExposure = current[exposure.symbol].shortExposure.plus(exposure.amount);
      }
    });

    return current;
  }, initialExposures) || {})
  .map(([symbol, exposure]) => ({ symbol: symbol, longExposure: exposure.longExposure.toNumber(), shortExposure: exposure.shortExposure.abs().toNumber() }))

	return (
    <BarChart width={730} height={250} data={exposures}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="symbol" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="longExposure" fill="#8884d8" />
      <Bar dataKey="shortExposure" fill="#82ca9d" />
    </BarChart>
	);
}