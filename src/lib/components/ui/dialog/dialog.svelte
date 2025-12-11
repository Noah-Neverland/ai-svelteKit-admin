<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface DialogProps {
		open?: boolean;
		class?: string;
		children?: Snippet<[open: boolean]>;
	}

	let { open = $bindable(false), class: className = '', children }: DialogProps = $props();
</script>

{#if open}
	<div class={cn('fixed inset-0 z-50 flex items-center justify-center', className)}>
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-black/50"
			role="button"
			tabindex="0"
			onclick={() => {
				open = false;
			}}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					open = false;
				}
			}}
		></div>
		<!-- Dialog Content -->
		<div class="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
			{@render children?.(open)}
		</div>
	</div>
{/if}