<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface CardHeaderProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: CardHeaderProps = $props();
</script>

<div class={cn('flex flex-col space-y-1.5 p-6', className)}>
	{@render children?.()}
</div>