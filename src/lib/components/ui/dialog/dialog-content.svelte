<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface DialogContentProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: DialogContentProps = $props();
</script>

<div class={cn('mt-4', className)}>
	{@render children?.()}
</div>