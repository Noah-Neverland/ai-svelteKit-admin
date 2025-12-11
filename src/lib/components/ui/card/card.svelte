<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface CardProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: CardProps = $props();
</script>

<div class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>
	{@render children?.()}
</div>