/**
 * 日期处理工具函数
 * 基于 date-fns（后续可集成）
 */

/**
 * 格式化日期
 */
export function formatDate(date: Date | string | number, format: string = 'YYYY-MM-DD'): string {
	const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
	
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	const hours = String(d.getHours()).padStart(2, '0');
	const minutes = String(d.getMinutes()).padStart(2, '0');
	const seconds = String(d.getSeconds()).padStart(2, '0');

	return format
		.replace('YYYY', String(year))
		.replace('MM', month)
		.replace('DD', day)
		.replace('HH', hours)
		.replace('mm', minutes)
		.replace('ss', seconds);
}

/**
 * 解析日期字符串
 */
export function parseDate(dateString: string): Date | null {
	const date = new Date(dateString);
	return isNaN(date.getTime()) ? null : date;
}

/**
 * 计算日期差（天数）
 */
export function diffInDays(date1: Date | string, date2: Date | string): number {
	const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
	const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
	const diffTime = Math.abs(d2.getTime() - d1.getTime());
	return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 相对时间显示（如：2小时前）
 */
export function formatRelativeTime(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffSecs = Math.floor(diffMs / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffSecs < 60) return '刚刚';
	if (diffMins < 60) return `${diffMins}分钟前`;
	if (diffHours < 24) return `${diffHours}小时前`;
	if (diffDays < 30) return `${diffDays}天前`;
	return formatDate(d);
}
