import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../common/http-client";

export function useTransactions() {
	return useQuery(['transactions'], async () => {
		const res = await apiClient.get('/transactions');
		return res.data
	});
}