/**
 * Axios 拦截器配置
 */
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { browser } from '$app/environment';
import { ROUTES } from '$lib/constants/routes';
import { localStorage } from '$lib/utils/storage';
import type { ApiResponse } from '$lib/types/common.types';

const TOKEN_KEY = 'auth_token';

/**
 * 设置拦截器
 */
export function setupInterceptors(instance: AxiosInstance): void {
	// 请求拦截器
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			// 只在客户端添加 token
			if (browser) {
				const token = localStorage.get<string>(TOKEN_KEY);
				if (token && config.headers) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			}

			// 添加语言标识（后续可扩展）
			if (config.headers) {
				config.headers['Accept-Language'] = 'zh-CN';
			}

			// 添加请求时间戳
			if (config.headers) {
				config.headers['X-Request-Time'] = String(Date.now());
			}

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// 响应拦截器
	instance.interceptors.response.use(
		(response: AxiosResponse<ApiResponse<any>>) => {
			const { data } = response;

			// 统一处理响应数据格式
			if (data.code === 200 || data.success) {
				return response;
			}

			// 业务错误处理
			const error = new Error(data.message || '请求失败');
			(error as any).code = data.code;
			(error as any).data = data.data;
			return Promise.reject(error);
		},
		(error: AxiosError<ApiResponse<any>>) => {
			// HTTP 错误处理
			if (error.response) {
				const { status, data } = error.response;

				switch (status) {
					case 401:
						// 未授权，清除 token 并跳转登录页（只在客户端）
						if (browser) {
							localStorage.remove(TOKEN_KEY);
							// 动态导入 goto 以避免 SSR 问题
							import('$app/navigation').then(({ goto }) => {
								goto(ROUTES.LOGIN);
							});
						}
						break;
					case 403:
						// 无权限
						console.error('权限不足');
						break;
					case 404:
						console.error('请求的资源不存在');
						break;
					case 500:
						console.error('服务器错误');
						break;
					default:
						console.error(data?.message || '请求失败');
				}
			} else if (error.request) {
				// 网络错误
				console.error('网络错误，请检查网络连接');
			} else {
				// 其他错误
				console.error('请求配置错误');
			}

			return Promise.reject(error);
		}
	);
}
