/**
 * API 相关类型定义
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from './common.types';

/**
 * API 错误
 */
export interface ApiError {
	code: number;
	message: string;
	data?: any;
}

/**
 * 请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {
	retry?: number; // 重试次数
	retryDelay?: number; // 重试延迟（毫秒）
}

/**
 * 响应拦截器类型
 */
export type ResponseInterceptor = (
	response: AxiosResponse<ApiResponse>
) => AxiosResponse<ApiResponse> | Promise<AxiosResponse<ApiResponse>>;

/**
 * 错误拦截器类型
 */
export type ErrorInterceptor = (error: any) => Promise<any>;
