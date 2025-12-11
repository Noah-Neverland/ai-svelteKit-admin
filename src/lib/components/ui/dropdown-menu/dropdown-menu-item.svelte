<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface DropdownMenuItemProps {
		class?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let { class: className = '', onclick, children }: DropdownMenuItemProps = $props();
</script>

<button
	type="button"
	class={cn(
		'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
		className
	)}
	role="menuitem"
	onclick={onclick}
>
	{@render children?.()}
</button>