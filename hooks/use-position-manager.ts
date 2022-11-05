import { useQuery } from "@tanstack/react-query";
import { apiClient, ApiResponse } from "../common/http-client";
import { toPositionModel } from "../common/mapping/position-mapping";
import { PositionManagerResponseDto } from "../types/position-manager";

export function usePositionManager(positionManagerAddress: string) {
	return useQuery(['position', positionManagerAddress], async () => {
		const res = await apiClient.get<ApiResponse<PositionManagerResponseDto>>(`/position_manager/${positionManagerAddress}`);
		return toPositionModel(res.data.data);
	});
}