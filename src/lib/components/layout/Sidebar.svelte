<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { menuStore, filteredMenuItems } from '$lib/stores/menu';
	import { ChevronRight, ChevronLeft } from 'lucide-svelte';
	import MenuTree from '../menu/MenuTree.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

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

<aside
	class="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-all duration-300 {$menuStore.collapsed
		? '-translate-x-full'
		: 'translate-x-0'}"
>
	<div class="flex h-full flex-col">
		<!-- 菜单内容 -->
		<div class="flex-1 overflow-y-auto p-4">
			<MenuTree items={$filteredMenuItems} />
		</div>

		<!-- 折叠按钮 -->
		<div class="border-t p-2">
			<Button
				variant="ghost"
				size="icon"
				class="w-full"
				onclick={() => menuStore.toggleCollapse()}
			>
				{#snippet children()}
					{#if $menuStore.collapsed}
						<ChevronRight class="h-4 w-4" />
					{:else}
						<ChevronLeft class="h-4 w-4" />
					{/if}
				{/snippet}
			</Button>
		</div>
	</div>
</aside>