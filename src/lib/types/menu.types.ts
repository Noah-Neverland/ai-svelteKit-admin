/**
 * 菜单相关类型定义
 */

/**
 * 菜单项
 */
export interface MenuItem {
	id: string;
	title: string;
	path?: string;
	icon?: string;
	children?: MenuItem[];
	permission?: string; // 权限标识
	roles?: string[]; // 角色标识
	hidden?: boolean; // 是否隐藏
	badge?: string | number; // 徽章
}

/**
 * 菜单配置
 */
export interface MenuConfig {
	items: MenuItem[];
	source: 'server' | 'local'; // 配置来源
}
