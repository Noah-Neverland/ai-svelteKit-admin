<script lang="ts">
	import { goto } from '$app/navigation';
	import { registerService } from '$lib/services/auth.service';
	import { ROUTES } from '$lib/constants/routes';
	import Captcha from './Captcha.svelte';
	import { validateEmail, validatePassword, validateUsername } from '$lib/utils/validation';

	// 使用 Svelte 5 runes 声明响应式状态
	let username = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let captcha = $state('');
	let agreeTerms = $state(false);
	let loading = $state(false);
	let error = $state('');

	async function handleSubmit() {
		error = '';

		// 验证用户名
		const usernameValidation = validateUsername(username);
		if (!usernameValidation.valid) {
			error = usernameValidation.message || '用户名验证失败';
			return;
		}

		// 验证邮箱
		const emailValidation = validateEmail(email);
		if (!emailValidation.valid) {
			error = emailValidation.message || '邮箱验证失败';
			return;
		}

		// 验证密码
		const passwordValidation = validatePassword(password);
		if (!passwordValidation.valid) {
			error = passwordValidation.message || '密码验证失败';
			return;
		}

		// 验证确认密码
		if (password !== confirmPassword) {
			error = '两次输入的密码不一致';
			return;
		}

		if (!captcha.trim()) {
			error = '请输入验证码';
			return;
		}

		if (!agreeTerms) {
			error = '请先阅读并同意用户协议和隐私政策';
			return;
		}

		loading = true;
		try {
			await registerService({
				username: username.trim(),
				email: email.trim(),
				password,
				confirmPassword,
				captcha,
				agreeTerms
			});
		} catch (err: any) {
			error = err.message || '注册失败，请重试';
		} finally {
			loading = false;
		}
	}

	function handleCaptchaInput(value: string) {
		captcha = value;
	}
</script>

<div class="register-form max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
	<h2 class="text-2xl font-bold text-center mb-6">用户注册</h2>

	<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
		<div>
			<label for="reg-username" class="block text-sm font-medium text-gray-700 mb-1">
				用户名
			</label>
			<input
				id="reg-username"
				type="text"
				bind:value={username}
				placeholder="请输入用户名"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
		</div>

		<div>
			<label for="reg-email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
			<input
				id="reg-email"
				type="email"
				bind:value={email}
				placeholder="请输入邮箱"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
		</div>

		<div>
			<label for="reg-password" class="block text-sm font-medium text-gray-700 mb-1">
				密码
			</label>
			<input
				id="reg-password"
				type="password"
				bind:value={password}
				placeholder="请输入密码"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
		</div>

		<div>
			<label for="reg-confirm-password" class="block text-sm font-medium text-gray-700 mb-1">
				确认密码
			</label>
			<input
				id="reg-confirm-password"
				type="password"
				bind:value={confirmPassword}
				placeholder="请再次输入密码"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
		</div>

		<div>
			<div class="block text-sm font-medium text-gray-700 mb-1">验证码</div>
			<Captcha value={captcha} onInput={handleCaptchaInput} />
		</div>

		<div class="flex items-start">
			<input
				id="agreeTerms"
				type="checkbox"
				bind:checked={agreeTerms}
				class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
			/>
			<label for="agreeTerms" class="ml-2 block text-sm text-gray-700">
				我已阅读并同意
				<a href="/terms" class="text-blue-600 hover:text-blue-800">用户协议</a>
				和
				<a href="/privacy" class="text-blue-600 hover:text-blue-800">隐私政策</a>
			</label>
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
			{loading ? '注册中...' : '注册'}
		</button>
	</form>

	<div class="mt-4 text-center">
		<div class="text-sm text-gray-600">
			已有账号？
			<a href={ROUTES.LOGIN} class="text-blue-600 hover:text-blue-800">立即登录</a>
		</div>
	</div>
</div>
