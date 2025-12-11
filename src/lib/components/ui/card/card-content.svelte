<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface CardContentProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: CardContentProps = $props();
</script>

<div class={cn('p-6 pt-0', className)}>
	{@render children?.()}
</div>