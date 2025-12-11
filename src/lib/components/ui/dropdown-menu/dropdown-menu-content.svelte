<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface DropdownMenuContentProps {
		open: boolean;
		class?: string;
		children?: Snippet;
	}

	let { open, class: className = '', children }: DropdownMenuContentProps = $props();
</script>

{#if open}
	<div
		class={cn(
			'absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800',
			className
		)}
		role="menu"
	>
		{@render children?.()}
	</div>
{/if}