import axios from 'axios'

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export interface ApiResponse<T> {
	type: "success" | "error"
	data: T;	
}