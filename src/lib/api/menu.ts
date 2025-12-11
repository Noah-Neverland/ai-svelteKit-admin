/**
 * 菜单 API
 */
import { request } from './client';
import type { MenuItem } from '$lib/types/menu.types';

/**
 * 获取菜单配置
 */
export async function getMenuApi(): Promise<MenuItem[]> {
	const response = await request.get<{ data: MenuItem[] }>('/api/menu');
	return response.data.data;
}