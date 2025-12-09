/**
 * 主题配置
 */

export const THEME_COLORS = [
	{ value: 'default', label: '默认' },
	{ value: 'red', label: '红色' },
	{ value: 'rose', label: '玫瑰色' },
	{ value: 'orange', label: '橙色' },
	{ value: 'green', label: '绿色' },
	{ value: 'blue', label: '蓝色' },
	{ value: 'yellow', label: '黄色' },
	{ value: 'violet', label: '紫色' }
] as const;

export const DEFAULT_THEME = 'default' as const;

export type ThemeColor = (typeof THEME_COLORS)[number]['value'];
