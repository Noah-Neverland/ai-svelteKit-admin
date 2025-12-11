<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	const COLLAPSIBLE_CONTEXT_KEY = Symbol('collapsible');

	interface CollapsibleContext {
		open: () => boolean;
		toggle: () => void;
		setOpen: (value: boolean) => void;
	}

	interface CollapsibleTriggerProps {
		class?: string;
		children?: Snippet;
		onclick?: (e: MouseEvent) => void;
	}

	let { class: className = '', children, onclick }: CollapsibleTriggerProps = $props();

	const context = getContext<CollapsibleContext>(COLLAPSIBLE_CONTEXT_KEY);
	if (!context) {
		throw new Error('Collapsible.Trigger must be used within Collapsible.Root');
	}

	const { toggle, open } = context;
	const isOpen = $derived(open());

	function handleClick(e: MouseEvent) {
		toggle();
		if (onclick) {
			onclick(e);
		}
	}
</script>

<button
	type="button"
	onclick={handleClick}
	class={cn('w-full', className)}
	data-state={isOpen ? 'open' : 'closed'}
>
	{@render children?.()}
</button>
