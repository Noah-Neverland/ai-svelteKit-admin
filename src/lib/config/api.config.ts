/**
 * API 配置
 */

export const API_CONFIG = {
	BASE_URL: import.meta.env.PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
	TIMEOUT: 30000, // 30秒
	RETRY_COUNT: 3, // 重试次数
	RETRY_DELAY: 1000 // 重试延迟（毫秒）
} as const;
