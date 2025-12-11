/**
 * 菜单服务
 */
import { APP_CONFIG } from '$lib/config/app.config';
import { MENU_CONFIG } from '$lib/config/menu.config';
import { menuStore } from '$lib/stores/menu';
import type { MenuItem } from '$lib/types/menu.types';

/**
 * 加载菜单
 */
export async function loadMenuService(): Promise<MenuItem[]> {
	if (APP_CONFIG.MENU_SOURCE === 'server') {
		// TODO: 从服务端加载菜单
		// const response = await menuApi.getMenu();
		// return response.data;
		return MENU_CONFIG;
	} else {
		return MENU_CONFIG;
	}
}

/**
 * 初始化菜单
 */
export async function initMenuService() {
	const items = await loadMenuService();
	menuStore.setMenuItems(items);
}

/**
 * 根据路径查找菜单项
 */
export function findMenuByPath(path: string, items?: MenuItem[]): MenuItem | null {
	if (!items) {
		// 在服务端或非响应式上下文中，需要同步获取值
		let currentItems: MenuItem[] = [];
		menuStore.subscribe((state) => {
			currentItems = state.menuItems;
		})();
		items = currentItems;
	}
	for (const item of items) {
		if (item.path === path) {
			return item;
		}
		if (item.children) {
			const found = findMenuByPath(path, item.children);
			if (found) return found;
		}
	}
	return null;
}

/**
 * 生成面包屑路径
 */
export function generateBreadcrumb(path: string, items?: MenuItem[]): MenuItem[] {
	if (!items) {
		// 在服务端或非响应式上下文中，需要同步获取值
		let currentItems: MenuItem[] = [];
		menuStore.subscribe((state) => {
			currentItems = state.menuItems;
		})();
		items = currentItems;
	}
	const breadcrumb: MenuItem[] = [];

	function findPath(currentPath: string, currentItems: MenuItem[], currentBreadcrumb: MenuItem[]): boolean {
		for (const item of currentItems) {
			const newBreadcrumb = [...currentBreadcrumb, item];
			if (item.path === currentPath) {
				breadcrumb.push(...newBreadcrumb);
				return true;
			}
			if (item.children) {
				if (findPath(currentPath, item.children, newBreadcrumb)) {
					return true;
				}
			}
		}
		return false;
	}

	findPath(path, items, []);
	return breadcrumb;
}