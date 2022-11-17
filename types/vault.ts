import BigNumber from 'bignumber.js';
import { PositionManager, PositionManagerResponseDto } from './position-manager';

export interface Vault {
		vaultAddress: string;
		positionManagers: PositionManager[];
		vaultWorth: BigNumber;
		availableLiquidity: BigNumber;	
}

export interface VaultResponseDto {
	vaultAddress: string;
	positionManagers: PositionManagerResponseDto[];
	vaultWorth: string;
	availableLiquidity: string;	
}