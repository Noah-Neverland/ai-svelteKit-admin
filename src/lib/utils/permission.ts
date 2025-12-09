/**
 * 权限判断工具函数
 */

export type Role = string;
export type Permission = string;

/**
 * 检查用户是否有指定角色
 */
export function hasRole(userRoles: Role[], requiredRole: Role): boolean {
	return userRoles.includes(requiredRole);
}

/**
 * 检查用户是否有任一角色
 */
export function hasAnyRole(userRoles: Role[], requiredRoles: Role[]): boolean {
	return requiredRoles.some((role) => userRoles.includes(role));
}

/**
 * 检查用户是否有所有角色
 */
export function hasAllRoles(userRoles: Role[], requiredRoles: Role[]): boolean {
	return requiredRoles.every((role) => userRoles.includes(role));
}

/**
 * 检查用户是否有指定权限
 */
export function hasPermission(userPermissions: Permission[], requiredPermission: Permission): boolean {
	return userPermissions.includes(requiredPermission);
}

/**
 * 检查用户是否有任一权限
 */
export function hasAnyPermission(
	userPermissions: Permission[],
	requiredPermissions: Permission[]
): boolean {
	return requiredPermissions.some((perm) => userPermissions.includes(perm));
}

/**
 * 检查用户是否有所有权限
 */
export function hasAllPermissions(
	userPermissions: Permission[],
	requiredPermissions: Permission[]
): boolean {
	return requiredPermissions.every((perm) => userPermissions.includes(perm));
}
