<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface TableProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: TableProps = $props();
</script>

<div class={cn('relative w-full overflow-auto', className)}>
	<table class="w-full caption-bottom text-sm">
		{@render children?.()}
	</table>
</div>