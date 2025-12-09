<script lang="ts">
	import LoginForm from '$lib/components/auth/LoginForm.svelte';
</script>

<div class="min-h-screen flex bg-gray-50">
	<!-- 左侧图片区域 -->
	<div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 items-center justify-center p-8">
		<div class="text-center text-white">
			<h1 class="text-4xl font-bold mb-4">欢迎回来</h1>
			<p class="text-xl opacity-90">登录您的账户以继续使用系统</p>
		</div>
	</div>

	<!-- 右侧表单区域 -->
	<div class="w-full lg:w-1/2 flex items-center justify-center p-8">
		<div class="w-full max-w-md">
			<!-- Logo 和标题 -->
			<div class="text-center mb-8">
				<div class="inline-block w-16 h-16 bg-blue-600 rounded-lg mb-4 flex items-center justify-center">
					<span class="text-2xl font-bold text-white">管</span>
				</div>
				<h1 class="text-2xl font-bold text-gray-800">后台管理系统</h1>
			</div>

			<!-- 登录表单 -->
			<LoginForm />
		</div>
	</div>
</div>
