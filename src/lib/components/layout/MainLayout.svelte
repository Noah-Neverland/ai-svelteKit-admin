<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { initMenuService } from '$lib/services/menu.service';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import Breadcrumb from './Breadcrumb.svelte';
	import { menuStore } from '$lib/stores/menu';
	import * as SidebarUI from '$lib/components/ui/sidebar/index.js';
	import type { Snippet } from 'svelte';

	interface MainLayoutProps {
		children: Snippet;
	}

	let { children }: MainLayoutProps = $props();

	onMount(async () => {
		if (browser) {
			await initMenuService();
		}
	});

	function handleSidebarOpenChange(open: boolean) {
		// 只在客户端执行
		if (!browser) return;
		
		// 同步到 menuStore，open 为 true 表示侧边栏打开，collapsed 应该为 false
		const shouldBeCollapsed = !open;
		if (shouldBeCollapsed !== $menuStore.collapsed) {
			menuStore.toggleCollapse();
		}
	}
</script>

<SidebarUI.Provider open={!$menuStore.collapsed} onOpenChange={handleSidebarOpenChange}>
	<div class="flex min-h-screen flex-col">
		<Header />
		<div class="flex flex-1">
			<Sidebar />
			<main class="flex-1 {$menuStore.collapsed ? 'ml-0' : 'ml-64'} transition-all duration-300">
				<Breadcrumb />
				<div class="p-6">
					{@render children()}
				</div>
			</main>
		</div>
	</div>
</SidebarUI.Provider>