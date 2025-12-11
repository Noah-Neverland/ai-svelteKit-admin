<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarMenuProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarMenuProps = $props();
</script>

<ul class={cn('flex flex-col gap-1', className)}>
	{@render children?.()}
</ul>
