/**
 * useForm Hook
 * 表单状态管理和验证
 */
import { z } from 'zod';
import type { FormField, FormConfig } from '$lib/types/form.types';

export interface UseFormReturn<T = any> {
	values: T;
	errors: Record<string, string>;
	isValid: boolean;
	isSubmitting: boolean;
	setValue: (name: keyof T, value: any) => void;
	setError: (name: keyof T, error: string) => void;
	validate: () => boolean;
	validateField: (name: keyof T) => boolean;
	handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: Event) => Promise<void>;
	reset: () => void;
}

export function useForm<T extends Record<string, any>>(
	config: FormConfig<T>
): UseFormReturn<T> {
	const initialValues = (config.initialValues || {}) as T;
	let values = $state<T>({ ...initialValues } as T);
	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);

	const isValid = $derived.by(() => {
		return Object.keys(errors).length === 0;
	});

	function setValue(name: keyof T, value: any) {
		values[name] = value;
		// 清除该字段的错误
		if (errors[name as string]) {
			delete errors[name as string];
			errors = { ...errors };
		}
	}

	function setError(name: keyof T, error: string) {
		errors[name as string] = error;
		errors = { ...errors };
	}

	function validateField(name: keyof T): boolean {
		const field = config.fields.find((f) => f.name === name);
		if (!field || !field.rules) {
			return true;
		}

		try {
			field.rules.parse(values[name]);
			if (errors[name as string]) {
				delete errors[name as string];
				errors = { ...errors };
			}
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError(name, error.errors[0]?.message || '验证失败');
			}
			return false;
		}
	}

	function validate(): boolean {
		const newErrors: Record<string, string> = {};

		for (const field of config.fields) {
			if (field.hidden || field.disabled) continue;
			if (!field.rules) continue;

			try {
				field.rules.parse(values[field.name]);
			} catch (error) {
				if (error instanceof z.ZodError) {
					newErrors[field.name as string] = error.errors[0]?.message || '验证失败';
				}
			}
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(onSubmit: (values: T) => void | Promise<void>) {
		return async (e: Event) => {
			e.preventDefault();
			if (!validate()) {
				return;
			}

			isSubmitting = true;
			try {
				await onSubmit(values);
			} catch (error: any) {
				console.error('Form submit error:', error);
			} finally {
				isSubmitting = false;
			}
		};
	}

	function reset() {
		values = { ...initialValues } as T;
		errors = {};
	}

	return {
		values,
		errors,
		isValid,
		isSubmitting,
		setValue,
		setError,
		validate,
		validateField,
		handleSubmit,
		reset
	};
}