/**
 * 角色常量
 */

export const ROLES = {
	SUPER_ADMIN: 'super_admin',
	ADMIN: 'admin',
	USER: 'user',
	GUEST: 'guest'
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
