/**
 * 权限常量
 */

export const PERMISSIONS = {
	// 读取权限
	READ: 'read',
	
	// 写入权限
	WRITE: 'write',
	
	// 删除权限
	DELETE: 'delete',
	
	// 用户管理
	USER_READ: 'user:read',
	USER_WRITE: 'user:write',
	USER_DELETE: 'user:delete',
	
	// 角色管理
	ROLE_READ: 'role:read',
	ROLE_WRITE: 'role:write',
	ROLE_DELETE: 'role:delete'
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
