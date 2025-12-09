/**
 * 数据验证工具函数
 * 基于 Zod 提供验证函数
 */
import { z } from 'zod';

/**
 * 邮箱验证
 */
export const emailSchema = z.string().email('请输入有效的邮箱地址');

/**
 * 密码验证（至少包含字母和数字，长度6-20）
 */
export const passwordSchema = z
	.string()
	.min(6, '密码长度至少6位')
	.max(20, '密码长度不能超过20位')
	.regex(/^(?=.*[A-Za-z])(?=.*\d)/, '密码必须包含字母和数字');

/**
 * 手机号验证（中国大陆）
 */
export const phoneSchema = z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码');

/**
 * 用户名验证（3-20个字符，字母、数字、下划线）
 */
export const usernameSchema = z
	.string()
	.min(3, '用户名长度至少3个字符')
	.max(20, '用户名长度不能超过20个字符')
	.regex(/^[a-zA-Z0-9_]+$/, '用户名只能包含字母、数字和下划线');

/**
 * 验证邮箱
 */
export function validateEmail(email: string): { valid: boolean; message?: string } {
	try {
		emailSchema.parse(email);
		return { valid: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { valid: false, message: error.errors[0].message };
		}
		return { valid: false, message: '邮箱验证失败' };
	}
}

/**
 * 验证密码
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
	try {
		passwordSchema.parse(password);
		return { valid: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { valid: false, message: error.errors[0].message };
		}
		return { valid: false, message: '密码验证失败' };
	}
}

/**
 * 验证手机号
 */
export function validatePhone(phone: string): { valid: boolean; message?: string } {
	try {
		phoneSchema.parse(phone);
		return { valid: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { valid: false, message: error.errors[0].message };
		}
		return { valid: false, message: '手机号验证失败' };
	}
}

/**
 * 验证用户名
 */
export function validateUsername(username: string): { valid: boolean; message?: string } {
	try {
		usernameSchema.parse(username);
		return { valid: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { valid: false, message: error.errors[0].message };
		}
		return { valid: false, message: '用户名验证失败' };
	}
}
