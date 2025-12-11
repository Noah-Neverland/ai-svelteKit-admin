<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarRootProps {
		side?: 'left' | 'right';
		variant?: 'sidebar' | 'floating' | 'inset';
		collapsible?: 'offcanvas' | 'icon' | 'none';
		class?: string;
		children?: Snippet;
	}

	let {
		side = 'left',
		variant = 'sidebar',
		collapsible = 'offcanvas',
		class: className = '',
		children
	}: SidebarRootProps = $props();
</script>

<aside
	class={cn(
		'group peer fixed inset-y-0 z-50 flex h-screen w-64 flex-col border-r bg-sidebar transition-all duration-300',
		side === 'left' ? 'left-0' : 'right-0',
		variant === 'floating' && 'm-2 rounded-lg shadow-lg',
		className
	)}
	data-side={side}
	data-variant={variant}
	data-collapsible={collapsible}
>
	{@render children?.()}
</aside>
