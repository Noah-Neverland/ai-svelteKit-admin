<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface DropdownMenuProps {
		open?: boolean;
		class?: string;
		children?: Snippet<[open: boolean]>;
	}

	let { open = $bindable(false), class: className = '', children }: DropdownMenuProps = $props();
</script>

<div class={cn('relative inline-block text-left', className)}>
	{@render children?.(open)}
</div>