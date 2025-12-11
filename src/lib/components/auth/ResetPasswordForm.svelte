<script lang="ts">
	import { goto } from '$app/navigation';
	import { resetPasswordService } from '$lib/services/auth.service';
	import { ROUTES } from '$lib/constants/routes';
	import { validatePassword } from '$lib/utils/validation';
	import { page } from '$app/stores';

	// 使用 Svelte 5 runes 声明响应式状态
	let password = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);
	let error = $state('');

	// 使用 $derived 获取 resetToken（替代 $:）
	let resetToken = $derived($page.url.searchParams.get('token') || '');

	async function handleSubmit() {
		error = '';

		if (!resetToken) {
			error = '重置令牌无效，请重新申请';
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

		loading = true;
		try {
			await resetPasswordService({
				token: resetToken,
				password,
				confirmPassword
			});
		} catch (err: any) {
			error = err.message || '重置密码失败，请重试';
		} finally {
			loading = false;
		}
	}
</script>

<div class="reset-password-form max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
	<h2 class="text-2xl font-bold text-center mb-6">重置密码</h2>

	<p class="text-sm text-gray-600 mb-6 text-center">请设置您的新密码</p>

	<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
		<div>
			<label for="reset-password" class="block text-sm font-medium text-gray-700 mb-1">
				新密码
			</label>
			<input
				id="reset-password"
				type="password"
				bind:value={password}
				placeholder="请输入新密码"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
		</div>

		<div>
			<label for="reset-confirm-password" class="block text-sm font-medium text-gray-700 mb-1">
				确认新密码
			</label>
			<input
				id="reset-confirm-password"
				type="password"
				bind:value={confirmPassword}
				placeholder="请再次输入新密码"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>
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
			{loading ? '重置中...' : '确认重置'}
		</button>
	</form>

	<div class="mt-4 text-center">
		<a href={ROUTES.LOGIN} class="text-sm text-blue-600 hover:text-blue-800">返回登录</a>
	</div>
</div>
