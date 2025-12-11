/**
 * 菜单配置（前端配置）
 */
import type { MenuItem } from '$lib/types/menu.types';

export const MENU_CONFIG: MenuItem[] = [
	{
		id: 'home',
		title: '首页',
		path: '/',
		icon: 'LayoutDashboard'
	},
	{
		id: 'system',
		title: '系统管理',
		icon: 'Settings',
		children: [
			{
				id: 'user',
				title: '用户管理',
				path: '/system/user',
				icon: 'Users'
			},
			{
				id: 'role',
				title: '角色管理',
				path: '/system/role',
				icon: 'Shield'
			},
			{
				id: 'settings',
				title: '系统设置',
				path: '/system/settings',
				icon: 'Cog'
			}
		]
	},
	{
		id: 'analytics',
		title: '数据分析',
		icon: 'BarChart',
		children: [
			{
				id: 'statistics',
				title: '数据统计',
				path: '/analytics/statistics',
				icon: 'TrendingUp'
			},
			{
				id: 'reports',
				title: '报表管理',
				path: '/analytics/reports',
				icon: 'FileText'
			}
		]
	}
];