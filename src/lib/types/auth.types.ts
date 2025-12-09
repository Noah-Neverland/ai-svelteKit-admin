/**
 * 认证相关类型定义
 */

/**
 * 登录请求
 */
export interface LoginRequest {
	username: string; // 用户名或邮箱
	password: string;
	captcha: string; // 验证码
	rememberMe?: boolean; // 记住我
}

/**
 * 登录响应
 */
export interface LoginResponse {
	token: string;
	refreshToken?: string;
	expiresIn?: number; // token 过期时间（秒）
	user: UserInfo;
}

/**
 * 注册请求
 */
export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	captcha: string;
	agreeTerms?: boolean; // 同意协议
}

/**
 * 忘记密码请求
 */
export interface ForgotPasswordRequest {
	email: string;
	captcha: string;
}

/**
 * 重置密码请求
 */
export interface ResetPasswordRequest {
	token: string; // 重置令牌
	password: string;
	confirmPassword: string;
}

/**
 * 用户信息
 */
export interface UserInfo {
	id: string | number;
	username: string;
	email: string;
	avatar?: string;
	roles?: string[];
	permissions?: string[];
}
