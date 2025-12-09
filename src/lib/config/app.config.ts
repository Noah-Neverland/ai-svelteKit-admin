/**
 * 应用配置
 */

export const APP_CONFIG = {
	APP_NAME: '后台管理系统',
	APP_VERSION: '0.0.1',
	MENU_SOURCE: 'local' as 'server' | 'local' // 菜单配置来源：server（服务端）| local（前端配置）
} as const;
