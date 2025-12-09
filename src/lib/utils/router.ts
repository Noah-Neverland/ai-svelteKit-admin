/**
 * 路由工具函数
 */
import { goto as svelteGoto } from '$app/navigation';
import type { MenuItem } from '$lib/types/menu.types';

/**
 * 路由跳转
 */
export function goto(path: string, options?: { replaceState?: boolean; noScroll?: boolean }) {
	return svelteGoto(path, options);
}

/**
 * 根据菜单配置生成面包屑路径
 */
export function generateBreadcrumb(
	currentPath: string,
	menuItems: MenuItem[],
	breadcrumb: MenuItem[] = []
): MenuItem[] {
	for (const item of menuItems) {
		const newBreadcrumb = [...breadcrumb, item];

		if (item.path === currentPath) {
			return newBreadcrumb;
		}

		if (item.children && item.children.length > 0) {
			const result = generateBreadcrumb(currentPath, item.children, newBreadcrumb);
			if (result.length > 0) {
				return result;
			}
		}
	}

	return [];
}
