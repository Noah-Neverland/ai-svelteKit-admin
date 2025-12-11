<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarMenuItemProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarMenuItemProps = $props();
</script>

<li class={cn('group/menu-item', className)}>
	{@render children?.()}
</li>
