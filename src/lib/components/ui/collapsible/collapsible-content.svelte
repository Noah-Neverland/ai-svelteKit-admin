<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	const COLLAPSIBLE_CONTEXT_KEY = Symbol('collapsible');

	interface CollapsibleContext {
		open: () => boolean;
		toggle: () => void;
	}

	interface CollapsibleContentProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: CollapsibleContentProps = $props();

	const context = getContext<CollapsibleContext>(COLLAPSIBLE_CONTEXT_KEY);
	if (!context) {
		throw new Error('Collapsible.Content must be used within Collapsible.Root');
	}

	const { open } = context;
	const isOpen = $derived(open());
</script>

{#if isOpen}
	<div class={cn('w-full', className)}>
		{@render children?.()}
	</div>
{/if}
