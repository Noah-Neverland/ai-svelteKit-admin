<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface SidebarGroupLabelProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: SidebarGroupLabelProps = $props();
</script>

<h3 class={cn('mb-2 px-2 text-xs font-semibold text-sidebar-foreground/70', className)}>
	{@render children?.()}
</h3>
