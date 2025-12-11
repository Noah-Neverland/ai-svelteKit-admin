<script lang="ts">
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { menuStore, filteredMenuItems } from '$lib/stores/menu';
	import { ChevronLeft } from 'lucide-svelte';
	import MenuTree from '../menu/MenuTree.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	// 只监听路由变化，使用 get 非响应式读取 store 值
	$effect(() => {
		// 根据当前路由设置选中的菜单项
		const currentPath = $page.url.pathname;
		
		// 使用 get 非响应式读取，避免循环依赖
		const menuItems = get(menuStore).menuItems;
		const currentSelectedKey = get(menuStore).selectedKey;
		
		function findMenuByPath(path: string, items: typeof menuItems): string | null {
			for (const item of items) {
				if (item.path === path) {
					return item.id;
				}
				if (item.children) {
					const found = findMenuByPath(path, item.children);
					if (found) return found;
				}
			}
			return null;
		}

		const selectedId = findMenuByPath(currentPath, menuItems);
		// 只有当找到的 selectedId 与当前不同时才更新，避免无限循环
		if (selectedId && selectedId !== currentSelectedKey) {
			menuStore.setSelectedKey(selectedId);
		}
	});
</script>

<Sidebar.Root
	collapsible="offcanvas"
	class="top-16 h-[calc(100vh-4rem)] {$menuStore.collapsed ? '-translate-x-full' : 'translate-x-0'}"
>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<MenuTree items={$filteredMenuItems} />
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Button
			variant="ghost"
			size="icon"
			class="w-full"
			onclick={() => menuStore.toggleCollapse()}
		>
			{#snippet children()}
				<ChevronLeft class="h-4 w-4" />
			{/snippet}
		</Button>
	</Sidebar.Footer>
</Sidebar.Root>