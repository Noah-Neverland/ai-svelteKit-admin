<script lang="ts">
	import { goto } from '$app/navigation';
	import { menuStore } from '$lib/stores/menu';
	import type { MenuItem } from '$lib/types/menu.types';
	import { ChevronRight } from 'lucide-svelte';
	import * as Icons from 'lucide-svelte';
	
	// 自导入用于递归
	import Self from './MenuTree.svelte';

	interface MenuTreeProps {
		items: MenuItem[];
		level?: number;
	}

	let { items, level = 0 }: MenuTreeProps = $props();

	function getIcon(iconName?: string) {
		if (!iconName) return null;
		const Icon = (Icons as any)[iconName];
		return Icon || null;
	}

	function handleClick(item: MenuItem) {
		if (item.path) {
			goto(item.path);
			menuStore.setSelectedKey(item.id);
		} else if (item.children) {
			menuStore.toggleExpand(item.id);
		}
	}
</script>

<ul class="space-y-1">
	{#each items as item (item.id)}
		<li>
			<button
				type="button"
				class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent {$menuStore.selectedKey === item.id
					? 'bg-accent font-medium'
					: ''}"
				onclick={() => handleClick(item)}
			>
				{#if item.icon}
					{@const Icon = getIcon(item.icon)}
					{#if Icon}
						<Icon class="h-4 w-4" />
					{/if}
				{/if}
				<span class="flex-1 text-left">{item.title}</span>
				{#if item.children}
					<ChevronRight
						class="h-4 w-4 transition-transform {$menuStore.expandedKeys.has(item.id)
							? 'rotate-90'
							: ''}"
					/>
				{/if}
				{#if item.badge}
					<span class="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
						{item.badge}
					</span>
				{/if}
			</button>

			{#if item.children && $menuStore.expandedKeys.has(item.id)}
				<div class="ml-4 mt-1">
					<Self items={item.children} level={level + 1} />
				</div>
			{/if}
		</li>
	{/each}
</ul>