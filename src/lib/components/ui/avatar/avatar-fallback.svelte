<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface AvatarFallbackProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: AvatarFallbackProps = $props();
</script>

<div
	class={cn(
		'flex h-full w-full items-center justify-center rounded-full bg-muted',
		className
	)}
>
	{@render children?.()}
</div>
