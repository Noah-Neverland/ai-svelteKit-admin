/**
 * 数据格式化工具函数
 */

/**
 * 格式化货币
 */
export function formatCurrency(
	amount: number,
	currency: string = 'CNY',
	locale: string = 'zh-CN'
): string {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency
	}).format(amount);
}

/**
 * 格式化数字
 */
export function formatNumber(
	value: number,
	options?: Intl.NumberFormatOptions,
	locale: string = 'zh-CN'
): string {
	return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * 格式化百分比
 */
export function formatPercent(
	value: number,
	decimals: number = 2,
	locale: string = 'zh-CN'
): string {
	return new Intl.NumberFormat(locale, {
		style: 'percent',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	}).format(value / 100);
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
