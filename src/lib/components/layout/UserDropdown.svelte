<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import { ROUTES } from '$lib/constants/routes';
	import { User, LogOut, Key } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown-menu/dropdown-menu.svelte';
	import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/dropdown-menu-trigger.svelte';
	import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';
	import ChangePasswordDialog from '../user/ChangePasswordDialog.svelte';

	let dropdownOpen = $state(false);
	let changePasswordOpen = $state(false);
	let logoutConfirmOpen = $state(false);

	let user = $state<any>(null);
	
	$effect(() => {
		const unsubscribe = authStore.subscribe((state) => {
			user = state.user;
		});
		return unsubscribe;
	});

	function handleLogout() {
		logoutConfirmOpen = true;
	}

	function confirmLogout() {
		authStore.logout();
		logoutConfirmOpen = false;
		goto(ROUTES.LOGIN);
	}

	function handleChangePassword() {
		changePasswordOpen = true;
		dropdownOpen = false;
	}
</script>

	<DropdownMenu bind:open={dropdownOpen}>
	{#snippet children(open)}
		<DropdownMenuTrigger
			class="flex items-center gap-2 rounded-full p-1 hover:bg-accent"
			onclick={() => {
				dropdownOpen = !dropdownOpen;
			}}
		>
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
				<User class="h-4 w-4" />
			</div>
			<span class="hidden md:inline-block">{user?.username || 'Admin'}</span>
		</DropdownMenuTrigger>
		<DropdownMenuContent open={open}>
			{#snippet children()}
				<div class="px-4 py-2 border-b">
					<p class="text-sm font-medium">{user?.username || 'Admin'}</p>
					<p class="text-xs text-muted-foreground">{user?.email || 'admin@example.com'}</p>
				</div>
				<DropdownMenuItem onclick={handleChangePassword}>
					{#snippet children()}
						<Key class="mr-2 h-4 w-4" />
						修改密码
					{/snippet}
				</DropdownMenuItem>
				<DropdownMenuItem onclick={handleLogout}>
					{#snippet children()}
						<LogOut class="mr-2 h-4 w-4" />
						退出登录
					{/snippet}
				</DropdownMenuItem>
			{/snippet}
		</DropdownMenuContent>
	{/snippet}
</DropdownMenu>

<!-- 修改密码对话框 -->
<ChangePasswordDialog bind:open={changePasswordOpen} />

<!-- 退出登录确认对话框 -->
{#if logoutConfirmOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<div class="fixed inset-0 bg-black/50" onclick={() => (logoutConfirmOpen = false)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && (logoutConfirmOpen = false)}></div>
		<div class="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
			<h2 class="text-lg font-semibold mb-4">确认退出</h2>
			<p class="text-sm text-muted-foreground mb-4">确定要退出登录吗？</p>
			<div class="flex justify-end gap-2">
				<Button variant="outline" onclick={() => (logoutConfirmOpen = false)}>
					{#snippet children()}
						取消
					{/snippet}
				</Button>
				<Button variant="destructive" onclick={confirmLogout}>
					{#snippet children()}
						确认退出
					{/snippet}
				</Button>
			</div>
		</div>
	</div>
{/if}