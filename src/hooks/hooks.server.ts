/**
 * SvelteKit 服务端 Hooks
 * 用于路由守卫和权限检查
 */
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { ROUTES } from '$lib/constants/routes';

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event;
	const pathname = url.pathname;

	// 认证相关路由，不需要检查登录状态
	const authRoutes = [
		ROUTES.LOGIN,
		ROUTES.REGISTER,
		ROUTES.FORGOT_PASSWORD,
		ROUTES.RESET_PASSWORD
	];

	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

	// 检查 token（从 cookie 或 header 中获取）
	const token = cookies.get('auth_token') || event.request.headers.get('authorization');

	// 如果不是认证路由且没有 token，重定向到登录页
	if (!isAuthRoute && !token && pathname !== ROUTES.DASHBOARD) {
		throw redirect(302, ROUTES.LOGIN);
	}

	// 如果是认证路由且已登录，重定向到首页
	if (isAuthRoute && token) {
		throw redirect(302, ROUTES.DASHBOARD);
	}

	return resolve(event);
};
