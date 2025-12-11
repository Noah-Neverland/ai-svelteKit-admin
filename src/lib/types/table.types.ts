/**
 * 表格相关类型定义
 */
import type { ComponentType } from 'svelte';

/**
 * 表格列配置
 */
export interface TableColumn<T = any> {
	key: string;
	title: string;
	dataIndex?: keyof T | string;
	component?: string | ComponentType;
	props?: Record<string, any>;
	render?: (value: any, record: T, index: number) => any;
	width?: number | string;
	align?: 'left' | 'center' | 'right';
	sortable?: boolean;
	filterable?: boolean;
	fixed?: 'left' | 'right';
}

/**
 * 分页配置
 */
export interface PaginationConfig {
	current: number;
	pageSize: number;
	total: number;
}

/**
 * 排序配置
 */
export interface SortConfig {
	key: string;
	order: 'asc' | 'desc';
}

/**
 * 表格配置
 */
export interface TableConfig<T = any> {
	columns: TableColumn<T>[];
	data: T[];
	pagination?: PaginationConfig;
	sorting?: SortConfig;
	loading?: boolean;
}