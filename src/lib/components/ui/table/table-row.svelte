<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface TableRowProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: TableRowProps = $props();
</script>

<tr class={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}>
	{@render children?.()}
</tr>