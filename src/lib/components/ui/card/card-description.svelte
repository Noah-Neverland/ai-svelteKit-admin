<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface CardDescriptionProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: CardDescriptionProps = $props();
</script>

<p class={cn('text-sm text-muted-foreground', className)}>
	{@render children?.()}
</p>
