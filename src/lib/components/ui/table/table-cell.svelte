<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface TableCellProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: TableCellProps = $props();
</script>

<td class={cn('p-4 align-middle', className)}>
	{@render children?.()}
</td>