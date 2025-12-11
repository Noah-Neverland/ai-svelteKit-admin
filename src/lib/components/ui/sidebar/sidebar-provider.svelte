<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';

	const SIDEBAR_CONTEXT_KEY = Symbol('sidebar');

	interface SidebarContext {
		open: () => boolean;
		setOpen: (open: boolean) => void;
		toggle: () => void;
		isMobile: () => boolean;
		getState: () => 'expanded' | 'collapsed';
	}

	interface SidebarProviderProps {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
	}

	let { open: openProp = true, onOpenChange, children }: SidebarProviderProps = $props();

	// 初始化 open 状态，确保在服务端也有默认值
	// 服务端渲染时使用默认值 true，客户端使用传入的值
	let open = $state(false);
	let isMobile = $state(false);

	// 只在客户端执行的效果
	$effect(() => {
		if (!browser) return;
		
		if (typeof openProp === 'boolean' && openProp !== open) {
			open = openProp;
		}
	});

	$effect(() => {
		if (!browser) return;
		
		if (onOpenChange && open !== openProp) {
			onOpenChange(open);
		}
	});

	// 浏览器检测和响应式处理
	onMount(() => {
		if (!browser || typeof window === 'undefined') return;
		
		function checkMobile() {
			isMobile = window.innerWidth < 768;
		}
		
		// 初始检查
		checkMobile();
		
		// 监听窗口大小变化
		window.addEventListener('resize', checkMobile);
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});

	function setOpen(newOpen: boolean) {
		open = newOpen;
		if (browser && onOpenChange) {
			onOpenChange(newOpen);
		}
	}

	function toggle() {
		setOpen(!open);
	}

	function getState() {
		return open ? 'expanded' : 'collapsed';
	}

	setContext<SidebarContext>(SIDEBAR_CONTEXT_KEY, {
		open: () => open,
		setOpen,
		toggle,
		isMobile: () => isMobile,
		getState
	});
</script>

{@render children?.()}
