/**
 * 表单相关类型定义
 */
import type { z } from 'zod';
import type { ComponentType } from 'svelte';

/**
 * 表单字段配置
 */
export interface FormField<T = any> {
	name: keyof T;
	label: string;
	component?: string | ComponentType;
	props?: Record<string, any>;
	rules?: z.ZodSchema;
	render?: (value: any, record: T) => any;
	hidden?: boolean;
	disabled?: boolean;
	placeholder?: string;
}

/**
 * 表单配置
 */
export interface FormConfig<T = any> {
	fields: FormField<T>[];
	initialValues?: Partial<T>;
	onSubmit?: (values: T) => void | Promise<void>;
}