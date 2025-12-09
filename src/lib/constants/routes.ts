/**
 * 路由常量
 */

export const ROUTES = {
	// 认证相关
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',
	
	// 后台管理
	DASHBOARD: '/',
	
	// 其他
	NOT_FOUND: '/404'
} as const;
