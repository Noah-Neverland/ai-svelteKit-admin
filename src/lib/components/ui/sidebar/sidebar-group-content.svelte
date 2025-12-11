<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarGroupContentProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarGroupContentProps = $props();
</script>

<div class={cn('flex flex-col gap-1', className)}>
	{@render children?.()}
</div>
