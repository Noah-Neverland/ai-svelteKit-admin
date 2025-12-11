<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils/cn';

	const COLLAPSIBLE_CONTEXT_KEY = Symbol('collapsible');

	interface CollapsibleContext {
		open: () => boolean;
		toggle: () => void;
		setOpen: (value: boolean) => void;
	}

	interface CollapsibleProps {
		open?: boolean;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
		onopenchange?: (open: boolean) => void;
	}

	let { 
		open: openProp = false, 
		disabled = false, 
		class: className = '', 
		children,
		onopenchange
	}: CollapsibleProps = $props();

	function setOpen(value: boolean) {
		if (!disabled) {
			openProp = value;
			if (onopenchange) {
				onopenchange(value);
			}
		}
	}

	function toggle() {
		if (!disabled) {
			const newValue = !openProp;
			openProp = newValue;
			if (onopenchange) {
				onopenchange(newValue);
			}
		}
	}

	// 创建上下文对象，确保函数总是读取最新的状态
	const context: CollapsibleContext = {
		open: () => openProp,
		toggle,
		setOpen
	};

	setContext<CollapsibleContext>(COLLAPSIBLE_CONTEXT_KEY, context);
</script>

<div class={cn('w-full', className)}>
	{@render children?.()}
</div>
