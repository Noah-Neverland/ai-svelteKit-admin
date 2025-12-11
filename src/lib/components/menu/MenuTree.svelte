<script lang="ts">
	import { goto } from '$app/navigation';
	import { menuStore } from '$lib/stores/menu';
	import type { MenuItem } from '$lib/types/menu.types';
	import { ChevronDown } from 'lucide-svelte';
	import * as Icons from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	
	// 自导入用于递归
	import Self from './MenuTree.svelte';

	interface MenuTreeProps {
		items: MenuItem[];
		level?: number;
	}

	let { items, level = 0 }: MenuTreeProps = $props();

	// 存储每个菜单项的展开状态
	const expandedStates = $state<Record<string, boolean>>({});

	function getIcon(iconName?: string) {
		if (!iconName) return null;
		const Icon = (Icons as any)[iconName];
		return Icon || null;
	}

	function handleClick(item: MenuItem) {
		if (item.path) {
			goto(item.path);
			menuStore.setSelectedKey(item.id);
		}
		// 对于有子菜单的项，展开/折叠由 Collapsible.Trigger 的 toggle() 处理
	}

	// 初始化并同步 store 的变化到本地状态
	let isUpdatingFromStore = false;
	$effect(() => {
		const storeExpandedKeys = $menuStore.expandedKeys;
		isUpdatingFromStore = true;
		for (const item of items) {
			if (item.children) {
				const storeExpanded = storeExpandedKeys.has(item.id);
				// 初始化或更新状态
				if (!(item.id in expandedStates)) {
					expandedStates[item.id] = storeExpanded;
				} else if (expandedStates[item.id] !== storeExpanded) {
					expandedStates[item.id] = storeExpanded;
				}
			}
		}
		isUpdatingFromStore = false;
	});

	// 同步本地状态变化到 store（当用户通过 UI 交互改变时）
	$effect(() => {
		if (isUpdatingFromStore) return;
		for (const item of items) {
			if (item.children && item.id in expandedStates) {
				const localExpanded = expandedStates[item.id];
				const storeExpanded = $menuStore.expandedKeys.has(item.id);
				if (localExpanded !== storeExpanded) {
					menuStore.toggleExpand(item.id);
				}
			}
		}
	});
</script>

<Sidebar.Menu>
	{#each items as item (item.id)}
		<Sidebar.MenuItem>
			{#if item.children}
				{@const itemId = item.id}
				{@const isExpanded = (itemId in expandedStates ? expandedStates[itemId] : $menuStore.expandedKeys.has(itemId)) ?? false}
				<Collapsible.Root 
					open={isExpanded}
					onopenchange={(value) => {
						expandedStates[itemId] = value;
						if (value !== $menuStore.expandedKeys.has(itemId)) {
							menuStore.toggleExpand(itemId);
						}
					}}
					class="group/collapsible"
				>
					<Collapsible.Root class="w-full p-0">
						<Sidebar.MenuButton
							isActive={$menuStore.selectedKey === item.id}
							onclick={() => handleClick(item)}
							class="w-full"
						>
							{#if item.icon}
								{@const Icon = getIcon(item.icon)}
								{#if Icon}
									<Icon class="h-4 w-4" />
								{/if}
							{/if}
							<span class="flex-1 text-left">{item.title}</span>
							{#if item.badge}
								<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
							{/if}
							<ChevronDown
								class="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
							/>
						</Sidebar.MenuButton>
					</Collapsible.Root>
					<Collapsible.Root>
						<div class="ml-6 mt-1 border-l pl-2">
							<Self items={item.children} level={level + 1} />
						</div>
					</Collapsible.Root>
				</Collapsible.Root>
			{:else}
				<Sidebar.MenuButton
					isActive={$menuStore.selectedKey === item.id}
					href={item.path}
					onclick={() => handleClick(item)}
				>
					{#if item.icon}
						{@const Icon = getIcon(item.icon)}
						{#if Icon}
							<Icon class="h-4 w-4" />
						{/if}
					{/if}
					<span class="flex-1 text-left">{item.title}</span>
					{#if item.badge}
						<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
					{/if}
				</Sidebar.MenuButton>
			{/if}
		</Sidebar.MenuItem>
	{/each}
</Sidebar.Menu>