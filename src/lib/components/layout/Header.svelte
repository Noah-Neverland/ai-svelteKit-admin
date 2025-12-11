<script lang="ts">
	import { goto } from '$app/navigation';
	import { APP_CONFIG } from '$lib/config/app.config';
	import { ROUTES } from '$lib/constants/routes';
	import { Search, Settings } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import UserDropdown from './UserDropdown.svelte';
	import SearchMenu from './SearchMenu.svelte';
	import SettingsDrawer from './SettingsDrawer.svelte';

	let searchOpen = $state(false);
	let settingsOpen = $state(false);

	function handleLogoClick() {
		goto(ROUTES.DASHBOARD);
	}

	function toggleSearch() {
		searchOpen = !searchOpen;
	}

	function toggleSettings() {
		settingsOpen = !settingsOpen;
	}
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="container flex h-16 items-center justify-between px-4">
		<!-- Logo 和项目名称 -->
		<div class="flex items-center gap-2 cursor-pointer" onclick={handleLogoClick} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && handleLogoClick()}>
			<div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
				<span class="text-lg font-bold">A</span>
			</div>
			<span class="text-lg font-semibold">{APP_CONFIG.APP_NAME}</span>
		</div>

		<!-- 右侧操作区 -->
		<div class="flex items-center gap-2">
			<!-- 搜索菜单 -->
			<Button variant="ghost" size="icon" onclick={toggleSearch}>
				{#snippet children()}
					<Search class="h-5 w-5" />
				{/snippet}
			</Button>

			<!-- 设置抽屉 -->
			<Button variant="ghost" size="icon" onclick={toggleSettings}>
				{#snippet children()}
					<Settings class="h-5 w-5" />
				{/snippet}
			</Button>

			<!-- 用户下拉菜单 -->
			<UserDropdown />
		</div>
	</div>
</header>

<!-- 搜索菜单 -->
<SearchMenu bind:open={searchOpen} />

<!-- 设置抽屉 -->
<SettingsDrawer bind:open={settingsOpen} />