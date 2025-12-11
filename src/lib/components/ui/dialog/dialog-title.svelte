<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface DialogTitleProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: DialogTitleProps = $props();
</script>

<h2 class={cn('text-lg font-semibold', className)}>
	{@render children?.()}
</h2>