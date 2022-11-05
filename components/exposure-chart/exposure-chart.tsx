import BigNumber from "bignumber.js";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { usePositionManager } from "../../hooks/use-position-manager";
import { PositionManager, PositionType } from "../../types/position-manager";

function getExposureAmount(positions: PositionManager[], positionType: PositionType) {
  return positions.reduce((amount, current) => {
    const currentAmount = current.exposure
      .filter(exp => (positionType === PositionType.Long && exp.amount.gt(0)) || (positionType === PositionType.Short && exp.amount.lt(0)))
      .reduce((exposureAmount, current) => {
        return exposureAmount + current.amount.abs().dividedBy(10**6).toNumber();
    }, 0)
    
    return amount + currentAmount;
  }, 0)
}


export function ExposureChart() {
  const glpPositionManagerAddress = process.env.glpPositionManagerAddress as string;
  const btcPerpPoolPositionManagerAddress = process.env.btcPerpPoolPositionManagerAddress as string;
  const ethPerpPoolPositionManagerAddress = process.env.ethPerpPoolPositionManagerAddress as string;
  
  const {  data: glpPositionManager, error: glpPositionManagerError, isLoading: glpPositionManagerLoading } = usePositionManager(glpPositionManagerAddress);
  const { data: btcPerpPoolPositionManager, error: btcPerpPoolPositionManagerError, isLoading: btcPerpPoolPositionManagerLoading } = usePositionManager(btcPerpPoolPositionManagerAddress);
  const { data: ethPerpPoolPositionManager, error: ethPerpPoolPositionManagerError, isLoading: ethPerpPoolPositionManagerLoading } = usePositionManager(ethPerpPoolPositionManagerAddress);
  
  const positionManagersLoading = glpPositionManagerLoading || btcPerpPoolPositionManagerLoading || ethPerpPoolPositionManagerLoading;
  console.log('Are position managers loading');
  if (positionManagersLoading) return <>...Loading</>;
  console.log('Did I make it after');
  
  if (!glpPositionManager || !btcPerpPoolPositionManager || !ethPerpPoolPositionManager) return <>...Loading</>;

  const positionManagers: PositionManager[] = [glpPositionManager, btcPerpPoolPositionManager, ethPerpPoolPositionManager];

  console.log(positionManagers);

  const initialExposures: {[key: string]: { longExposure: BigNumber, shortExposure: BigNumber }} = {};

  const exposures = Object.entries(positionManagers.reduce((current, position) => {
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

  console.log('exposures');
  console.log(exposures);

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