/**
 * SvelteKit 服务端 Hooks
 * 用于路由守卫和权限检查
 * 
 * 使用 SvelteKit 最新 API：
 * - handle: 请求处理钩子，支持 AbortSignal
 * - init: 服务器启动时初始化（可选）
 * - transport: 自定义序列化（可选）
 */
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { ROUTES } from '$lib/constants/routes';

/**
 * 请求处理钩子
 * 支持 AbortSignal（通过 event.request.signal 访问）
 */
export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies, request } = event;
	const pathname = url.pathname;

	// 处理 Chrome DevTools 的自动工作区请求（静默返回 404）
	if (dev && pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
		return new Response(null, { status: 404 });
	}

	// 获取 AbortSignal（SvelteKit 最新 API）
	// 可用于取消长时间运行的请求
	const signal = request.signal;

	// 认证相关路由，不需要检查登录状态
	const authRoutes = [
		ROUTES.LOGIN,
		ROUTES.REGISTER,
		ROUTES.FORGOT_PASSWORD,
		ROUTES.RESET_PASSWORD
	];

	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

	// 检查 token（从 cookie 或 header 中获取）
	const token = cookies.get('auth_token') || request.headers.get('authorization');

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

/**
 * 服务器启动时初始化钩子（可选）
 * 用于初始化数据库连接等异步任务
 * 
 * 示例：
 * export const init = async () => {
 *   await initializeDatabase();
 * };
 */

/**
 * 自定义序列化钩子（可选）
 * 用于序列化/反序列化非 POJO 对象
 * 
 * 示例：
 * export const transport = {
 *   encode: (value) => { // 序列化逻辑 },
 *   decode: (value) => { // 反序列化逻辑 }
 * };
 */
