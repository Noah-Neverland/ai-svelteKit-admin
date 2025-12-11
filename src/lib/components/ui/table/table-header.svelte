<script lang="ts">
	import type { Snippet } from 'svelte';

	interface TableHeaderProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: TableHeaderProps = $props();
</script>

<thead class={className}>
	{@render children?.()}
</thead>