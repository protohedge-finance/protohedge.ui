import BigNumber from "bignumber.js";
import { Pnl, PnlResponseDto } from "../../types/pnl";

export function toPnlModel(dto: PnlResponseDto): Pnl {
	return {
		pnlWorth: new BigNumber(dto.pnlWorth),
		pnlPercentage: dto.pnlPercentage,
		costBasis: new BigNumber(dto.costBasis),
		positionWorth: new BigNumber(dto.positionWorth),
	};
}

