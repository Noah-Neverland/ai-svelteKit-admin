/**
 * 认证相关 API
 */
import { request } from './client';
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest
} from '$lib/types/auth.types';
import type { ApiResponse } from '$lib/types/common.types';

/**
 * 登录
 */
export function login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
	return request.post('/auth/login', data);
}

/**
 * 注册
 */
export function register(data: RegisterRequest): Promise<ApiResponse<void>> {
	return request.post('/auth/register', data);
}

/**
 * 忘记密码
 */
export function forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<void>> {
	return request.post('/auth/forgot-password', data);
}

/**
 * 重置密码
 */
export function resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>> {
	return request.post('/auth/reset-password', data);
}

/**
 * 退出登录
 */
export function logout(): Promise<ApiResponse<void>> {
	return request.post('/auth/logout');
}

/**
 * 获取验证码
 */
export function getCaptcha(): Promise<ApiResponse<{ image: string; token: string }>> {
	return request.get('/auth/captcha');
}

/**
 * 修改密码
 */
export function changePassword(data: { oldPassword: string; newPassword: string }): Promise<ApiResponse<void>> {
	return request.post('/auth/change-password', data);
}
