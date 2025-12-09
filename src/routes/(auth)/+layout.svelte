<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';

	onMount(() => {
		// 只在客户端检查登录状态
		if (!browser) return;

		// 如果已登录，跳转到首页
		const unsubscribe = authStore.subscribe((state) => {
			if (state.isAuthenticated) {
				goto(ROUTES.DASHBOARD);
				unsubscribe();
			}
		});
	});
</script>

<slot />
