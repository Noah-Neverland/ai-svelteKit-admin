<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarFooterProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarFooterProps = $props();
</script>

<footer class={cn('flex h-16 shrink-0 items-center gap-2 border-t px-6', className)}>
	{@render children?.()}
</footer>
