/**
 * 后台管理布局服务端逻辑
 * 不需要检查登录状态
 */
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {};
};