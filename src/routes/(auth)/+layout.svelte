<script lang="ts">
	import { browser } from '$app/environment';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';

	// 使用 Svelte 5 snippets 语法
	let { children } = $props();

	// 使用 $effect 监听认证状态变化（Svelte 5）
	// 使用 $authStore 语法访问 store 值
	if (browser) {
		$effect(() => {
			if ($authStore.isAuthenticated) {
				goto(ROUTES.DASHBOARD);
			}
		});
	}
</script>

{@render children?.()}
