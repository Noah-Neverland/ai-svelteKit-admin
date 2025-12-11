/**
 * 菜单 Store
 * 注意：在普通 .ts 文件中不能使用 runes，需要使用传统的 writable store
 */
import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { MenuItem } from '$lib/types/menu.types';

interface MenuState {
	menuItems: MenuItem[];
	expandedKeys: Set<string>;
	selectedKey: string;
	searchKeyword: string;
	collapsed: boolean;
}

// 创建 store
function createMenuStore() {
	const { subscribe, set, update } = writable<MenuState>({
		menuItems: [],
		expandedKeys: new Set(),
		selectedKey: '',
		searchKeyword: '',
		collapsed: false
	});

	return {
		subscribe,
		setMenuItems: (items: MenuItem[]) => {
			update((state) => ({ ...state, menuItems: items }));
		},
		toggleExpand: (key: string) => {
			update((state) => {
				const newExpandedKeys = new Set(state.expandedKeys);
				if (newExpandedKeys.has(key)) {
					newExpandedKeys.delete(key);
				} else {
					newExpandedKeys.add(key);
				}
				return { ...state, expandedKeys: newExpandedKeys };
			});
		},
		setSelectedKey: (key: string) => {
			update((state) => ({ ...state, selectedKey: key }));
		},
		setSearchKeyword: (keyword: string) => {
			update((state) => ({ ...state, searchKeyword: keyword }));
		},
		toggleCollapse: () => {
			update((state) => ({ ...state, collapsed: !state.collapsed }));
		}
	};
}

export const menuStore = createMenuStore();

// 导出过滤后的菜单项（derived store）
export const filteredMenuItems: Readable<MenuItem[]> = derived(menuStore, ($menuStore) => {
	if (!$menuStore.searchKeyword.trim()) {
		return $menuStore.menuItems;
	}

	const keyword = $menuStore.searchKeyword.toLowerCase();
	const filterMenu = (items: MenuItem[]): MenuItem[] => {
		const result: MenuItem[] = [];
		for (const item of items) {
			const matches =
				item.title.toLowerCase().includes(keyword) ||
				item.path?.toLowerCase().includes(keyword);
			const filteredChildren = item.children ? filterMenu(item.children) : [];

			if (matches || filteredChildren.length > 0) {
				result.push({
					...item,
					children: filteredChildren.length > 0 ? filteredChildren : item.children
				});
			}
		}
		return result;
	};

	return filterMenu($menuStore.menuItems);
});