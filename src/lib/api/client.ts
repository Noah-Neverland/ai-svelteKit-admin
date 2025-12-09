/**
 * Axios 实例封装
 */
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '$lib/config/api.config';
import type { ApiResponse } from '$lib/types/common.types';
import type { RequestConfig } from '$lib/types/api.types';
import { setupInterceptors } from './interceptors';

/**
 * 创建 Axios 实例
 */
function createAxiosInstance(): AxiosInstance {
	const instance = axios.create({
		baseURL: API_CONFIG.BASE_URL,
		timeout: API_CONFIG.TIMEOUT,
		headers: {
			'Content-Type': 'application/json'
		}
	});

	// 设置拦截器
	setupInterceptors(instance);

	return instance;
}

// 导出单例
export const apiClient = createAxiosInstance();

/**
 * 请求方法封装
 */
export const request = {
	get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
		return apiClient.get<ApiResponse<T>>(url, config).then((res) => res.data);
	},

	post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
		return apiClient.post<ApiResponse<T>>(url, data, config).then((res) => res.data);
	},

	put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
		return apiClient.put<ApiResponse<T>>(url, data, config).then((res) => res.data);
	},

	delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
		return apiClient.delete<ApiResponse<T>>(url, config).then((res) => res.data);
	},

	patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
		return apiClient.patch<ApiResponse<T>>(url, data, config).then((res) => res.data);
	}
};
