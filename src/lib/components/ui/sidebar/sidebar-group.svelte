<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarGroupProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarGroupProps = $props();
</script>

<div class={cn('flex flex-col gap-1', className)}>
	{@render children?.()}
</div>
