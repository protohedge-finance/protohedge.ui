import BigNumber from 'bignumber.js';

export interface Pnl {
	pnlWorth: BigNumber;
	pnlPercentage: string;
	costBasis: BigNumber;
	positionWorth: BigNumber;
}

export interface PnlResponseDto {
	pnlWorth: string;
	pnlPercentage: string;
	costBasis: string;
	positionWorth: string;	
}