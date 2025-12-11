<script lang="ts">
	import { onMount } from 'svelte';
	import { initMenuService } from '$lib/services/menu.service';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import Breadcrumb from './Breadcrumb.svelte';
	import { menuStore } from '$lib/stores/menu';
	import type { Snippet } from 'svelte';

	interface MainLayoutProps {
		children: Snippet;
	}

	let { children }: MainLayoutProps = $props();

	onMount(async () => {
		await initMenuService();
	});
</script>

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