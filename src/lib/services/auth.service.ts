/**
 * 认证服务
 */
import * as authApi from '$lib/api/auth';
import { authStore } from '$lib/stores/auth';
import { goto } from '$app/navigation';
import { ROUTES } from '$lib/constants/routes';
import type {
	LoginRequest,
	RegisterRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest
} from '$lib/types/auth.types';

/**
 * 登录服务
 */
export async function loginService(data: LoginRequest): Promise<void> {
	try {
		const response = await authApi.login(data);
		if (response.success && response.data) {
			authStore.login(response.data.token, response.data.user, data.rememberMe);
			// 跳转到首页
			goto(ROUTES.DASHBOARD);
		} else {
			throw new Error(response.message || '登录失败');
		}
	} catch (error: any) {
		throw new Error(error.message || '登录失败，请检查用户名和密码');
	}
}

/**
 * 注册服务
 */
export async function registerService(data: RegisterRequest): Promise<void> {
	try {
		const response = await authApi.register(data);
		if (response.success) {
			// 注册成功后跳转到登录页
			goto(ROUTES.LOGIN);
		} else {
			throw new Error(response.message || '注册失败');
		}
	} catch (error: any) {
		throw new Error(error.message || '注册失败，请重试');
	}
}

/**
 * 忘记密码服务
 */
export async function forgotPasswordService(data: ForgotPasswordRequest): Promise<void> {
	try {
		const response = await authApi.forgotPassword(data);
		if (!response.success) {
			throw new Error(response.message || '发送重置链接失败');
		}
	} catch (error: any) {
		throw new Error(error.message || '发送重置链接失败，请重试');
	}
}

/**
 * 重置密码服务
 */
export async function resetPasswordService(data: ResetPasswordRequest): Promise<void> {
	try {
		const response = await authApi.resetPassword(data);
		if (response.success) {
			// 重置成功后跳转到登录页
			goto(ROUTES.LOGIN);
		} else {
			throw new Error(response.message || '重置密码失败');
		}
	} catch (error: any) {
		throw new Error(error.message || '重置密码失败，请重试');
	}
}

/**
 * 退出登录服务
 */
export async function logoutService(): Promise<void> {
	try {
		await authApi.logout();
	} catch (error) {
		console.error('退出登录失败:', error);
	} finally {
		authStore.logout();
		goto(ROUTES.LOGIN);
	}
}

/**
 * 获取验证码服务
 */
export async function getCaptchaService(): Promise<{ image: string; token: string }> {
	try {
		const response = await authApi.getCaptcha();
		if (response.success && response.data) {
			return response.data;
		}
		throw new Error('获取验证码失败');
	} catch (error: any) {
		throw new Error(error.message || '获取验证码失败，请重试');
	}
}
