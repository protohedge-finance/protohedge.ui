import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { CostBasisVsWorthChart } from '../components/cost-basis-vs-worth-chart/cost-basis-vs-worth-chart';
import { ExposureChart } from '../components/exposure-chart/exposure-chart';
import { PositionPieChart } from '../components/position-pie-chart/position-pie-chart';
import { Rebalancer } from '../components/rebalancer/rebalancer';


const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <ExposureChart />
      {/* <PositionPieChart />
      <CostBasisVsWorthChart />
      <ExposureChart />

      <ExposureChart />

      <Rebalancer /> */}

    </div>
  );
}
export default Home
