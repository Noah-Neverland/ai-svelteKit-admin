<script lang="ts">
	import type { Snippet } from 'svelte';

	interface DropdownMenuTriggerProps {
		class?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let { class: className = '', onclick, children }: DropdownMenuTriggerProps = $props();
</script>

<button type="button" class={className} onclick={onclick}>
	{@render children?.()}
</button>