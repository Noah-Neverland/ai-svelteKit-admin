<script lang="ts">
	import { onMount } from 'svelte';
	import { getCaptchaService } from '$lib/services/auth.service';

	let captchaImage = '';
	let captchaToken = '';
	let captchaValue = '';
	let loading = false;
	let error = '';

	export let value = '';
	export let onInput: (value: string) => void = () => {};

	$: if (captchaValue !== value) {
		onInput(captchaValue);
	}

	async function loadCaptcha() {
		loading = true;
		error = '';
		try {
			const result = await getCaptchaService();
			captchaImage = result.image;
			captchaToken = result.token;
			captchaValue = '';
			onInput('');
		} catch (err: any) {
			error = err.message || '加载验证码失败';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadCaptcha();
	});

	function handleRefresh() {
		loadCaptcha();
	}
</script>

<div class="captcha-container">
	<div class="flex gap-2 items-center">
		<div class="flex-1">
			<input
				type="text"
				bind:value={captchaValue}
				placeholder="请输入验证码"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div class="captcha-image-container">
			{#if loading}
				<div class="w-24 h-10 flex items-center justify-center bg-gray-100 rounded">
					<span class="text-sm text-gray-500">加载中...</span>
				</div>
			{:else if error}
				<div class="w-24 h-10 flex items-center justify-center bg-red-50 rounded">
					<span class="text-sm text-red-500">加载失败</span>
				</div>
			{:else if captchaImage}
				<button
					type="button"
					on:click={handleRefresh}
					class="w-24 h-10 border border-gray-300 rounded cursor-pointer p-0 bg-transparent"
					title="点击刷新验证码"
				>
					<img src={captchaImage} alt="验证码" class="w-full h-full object-contain" />
				</button>
			{:else}
				<div class="w-24 h-10 flex items-center justify-center bg-gray-100 rounded">
					<span class="text-sm text-gray-500">暂无验证码</span>
				</div>
			{/if}
		</div>
		<button
			type="button"
			on:click={handleRefresh}
			class="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md hover:bg-blue-50"
		>
			刷新
		</button>
	</div>
	{#if error}
		<p class="text-sm text-red-500 mt-1">{error}</p>
	{/if}
</div>
