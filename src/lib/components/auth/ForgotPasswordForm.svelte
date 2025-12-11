<script lang="ts">
	import { goto } from '$app/navigation';
	import { forgotPasswordService } from '$lib/services/auth.service';
	import { ROUTES } from '$lib/constants/routes';
	import Captcha from './Captcha.svelte';
	import { validateEmail } from '$lib/utils/validation';

	// 使用 Svelte 5 runes 声明响应式状态
	let email = $state('');
	let captcha = $state('');
	let loading = $state(false);
	let error = $state('');
	let success = $state(false);

	async function handleSubmit() {
		error = '';
		success = false;

		if (!email.trim()) {
			error = '请输入邮箱或用户名';
			return;
		}

		// 验证邮箱格式（如果输入的是邮箱）
		if (email.includes('@')) {
			const emailValidation = validateEmail(email);
			if (!emailValidation.valid) {
				error = emailValidation.message || '邮箱格式不正确';
				return;
			}
		}

		if (!captcha.trim()) {
			error = '请输入验证码';
			return;
		}

		loading = true;
		try {
			await forgotPasswordService({
				email: email.trim(),
				captcha
			});
			success = true;
		} catch (err: any) {
			error = err.message || '发送重置链接失败，请重试';
		} finally {
			loading = false;
		}
	}

	function handleCaptchaInput(value: string) {
		captcha = value;
	}
</script>

<div class="forgot-password-form max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
	<h2 class="text-2xl font-bold text-center mb-6">忘记密码</h2>

	{#if success}
		<div class="p-4 bg-green-50 border border-green-200 rounded-md mb-4">
			<p class="text-sm text-green-600">
				重置链接已发送到您的邮箱，请查收邮件并按照提示重置密码。
			</p>
		</div>
	{:else}
		<p class="text-sm text-gray-600 mb-6 text-center">请输入您的邮箱或用户名</p>

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
			<div>
				<label for="forgot-email" class="block text-sm font-medium text-gray-700 mb-1">
					邮箱/用户名
				</label>
				<input
					id="forgot-email"
					type="text"
					bind:value={email}
					placeholder="请输入邮箱或用户名"
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

		<div>
			<div class="block text-sm font-medium text-gray-700 mb-1">验证码</div>
			<Captcha value={captcha} onInput={handleCaptchaInput} />
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
				{loading ? '发送中...' : '发送重置链接'}
			</button>
		</form>
	{/if}

	<div class="mt-4 text-center">
		<a href={ROUTES.LOGIN} class="text-sm text-blue-600 hover:text-blue-800">返回登录</a>
	</div>
</div>
