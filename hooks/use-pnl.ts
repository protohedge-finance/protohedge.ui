import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../common/http-client";
import { toPnlModel } from "../common/mapping/pnl-mapping";
import { PnlResponseDto } from "../types/pnl";

export function usePnl() {
	return useQuery(['pnl'], async () => {
		const res = await apiClient.get<PnlResponseDto>('/pnl');
		return toPnlModel(res.data);
	});
}