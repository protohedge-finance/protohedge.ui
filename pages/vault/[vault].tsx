import { useRouter } from 'next/router';
import { ExposureChart } from '../../components/exposure-chart/exposure-chart';
import { useVault } from '../../hooks/use-vault';



export default function VaultContainer() {
  const router = useRouter();
  if (!router.isReady) return '...Loading';
  const {vault} = router.query;

  if (!vault) {
    return router.back();
  }

  return <Vault vaultAddress={vault as string} />
}

interface VaultProps {
  vaultAddress: string;
}

function Vault(props: VaultProps) {
  const { data: vault, error, isLoading } = useVault(props.vaultAddress);

  if (isLoading || !vault) return <>'...Loading'</>;

  return <ExposureChart vault={vault} />
}