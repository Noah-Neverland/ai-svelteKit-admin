<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarMenuButtonProps {
		isActive?: boolean;
		href?: string;
		class?: string;
		children?: Snippet;
		onclick?: () => void;
	}

	let {
		isActive = false,
		href,
		class: className = '',
		children,
		onclick
	}: SidebarMenuButtonProps = $props();
</script>

{#if href}
	<a
		href={href}
		onclick={onclick}
		class={cn(
			'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
			'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
			isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
			className
		)}
		data-active={isActive}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		type="button"
		onclick={onclick}
		class={cn(
			'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
			'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
			isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
			className
		)}
		data-active={isActive}
	>
		{@render children?.()}
	</button>
{/if}
