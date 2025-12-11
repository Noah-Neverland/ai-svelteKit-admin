<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarMenuBadgeProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarMenuBadgeProps = $props();
</script>

<span
	class={cn(
		'ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-xs font-medium text-sidebar-primary-foreground',
		className
	)}
>
	{@render children?.()}
</span>
