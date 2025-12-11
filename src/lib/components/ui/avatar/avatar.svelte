<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface AvatarProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: AvatarProps = $props();
</script>

<div class={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}>
	{@render children?.()}
</div>
