import BigNumber from "bignumber.js";
import { PositionManager, PositionManagerResponseDto } from "../../types/position-manager";
import { Vault, VaultResponseDto } from '../../types/vault';
import { toPositionManagerModel } from './position-manager-mapping';

export function toVaultModel(dto: VaultResponseDto): Vault {
	return {
		vaultAddress: dto.vaultAddress,
		positionManagers: dto.positionManagers.map(toPositionManagerModel),
		vaultWorth: new BigNumber(dto.vaultWorth),
		availableLiquidity: new BigNumber(dto.availableLiquidity)
	};	
}
