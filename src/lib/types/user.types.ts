/**
 * 用户相关类型定义
 */
import type { BaseEntity } from './common.types';

/**
 * 用户角色
 */
export type UserRole = 'super_admin' | 'admin' | 'user' | 'guest';

/**
 * 用户权限
 */
export type UserPermission = string;

/**
 * 用户实体
 */
export interface User extends BaseEntity {
	username: string;
	email: string;
	avatar?: string;
	roles: UserRole[];
	permissions: UserPermission[];
	status: 'active' | 'inactive' | 'banned';
}
