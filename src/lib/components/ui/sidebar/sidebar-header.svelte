<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarHeaderProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarHeaderProps = $props();
</script>

<header class={cn('flex h-16 shrink-0 items-center gap-2 border-b px-6', className)}>
	{@render children?.()}
</header>
