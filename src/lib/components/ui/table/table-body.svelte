<script lang="ts">
	import type { Snippet } from 'svelte';

	interface TableBodyProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: TableBodyProps = $props();
</script>

<tbody class={className}>
	{@render children?.()}
</tbody>