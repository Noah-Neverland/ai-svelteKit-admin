<script lang="ts">
	import { goto } from '$app/navigation';
	import { loginService } from '$lib/services/auth.service';
	import { ROUTES } from '$lib/constants/routes';
	import Captcha from './Captcha.svelte';
	import { validateEmail, validatePassword } from '$lib/utils/validation';

	let username = '';
	let password = '';
	let captcha = '';
	let rememberMe = false;
	let loading = false;
	let error = '';

	async function handleSubmit() {
		error = '';

		// 基础验证
		if (!username.trim()) {
			error = '请输入用户名或邮箱';
			return;
		}

		if (!password.trim()) {
			error = '请输入密码';
			return;
		}

		if (!captcha.trim()) {
			error = '请输入验证码';
			return;
		}

		loading = true;
		try {
			await loginService({
				username: username.trim(),
				password,
				captcha,
				rememberMe
			});
		} catch (err: any) {
			error = err.message || '登录失败，请重试';
		} finally {
			loading = false;
		}
	}

	function handleCaptchaInput(value: string) {
		captcha = value;
	}
</script>

<div class="login-form max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
	<h2 class="text-2xl font-bold text-center mb-6">用户登录</h2>

	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div>
			<label for="username" class="block text-sm font-medium text-gray-700 mb-1">
				用户名/邮箱
			</label>
			<input
				id="username"
				type="text"
				bind:value={username}
				placeholder="请输入用户名或邮箱"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				placeholder="请输入密码"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
		</div>

		<div>
			<div class="block text-sm font-medium text-gray-700 mb-1">验证码</div>
			<Captcha value={captcha} onInput={handleCaptchaInput} />
		</div>

		<div class="flex items-center">
			<input
				id="rememberMe"
				type="checkbox"
				bind:checked={rememberMe}
				class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
			/>
			<label for="rememberMe" class="ml-2 block text-sm text-gray-700"> 记住我 </label>
		</div>

		{#if error}
			<div class="p-3 bg-red-50 border border-red-200 rounded-md">
				<p class="text-sm text-red-600">{error}</p>
			</div>
		{/if}

		<button
			type="submit"
			disabled={loading}
			class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{loading ? '登录中...' : '登录'}
		</button>
	</form>

	<div class="mt-4 text-center space-y-2">
		<a href={ROUTES.FORGOT_PASSWORD} class="text-sm text-blue-600 hover:text-blue-800">
			忘记密码？
		</a>
		<div class="text-sm text-gray-600">
			还没有账号？
			<a href={ROUTES.REGISTER} class="text-blue-600 hover:text-blue-800">立即注册</a>
		</div>
	</div>
</div>
