<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarContentProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarContentProps = $props();
</script>

<div class={cn('flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4', className)}>
	{@render children?.()}
</div>
