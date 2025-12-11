<script lang="ts">
	import { changePasswordService } from '$lib/services/auth.service';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Dialog from '$lib/components/ui/dialog/dialog.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';

	interface ChangePasswordDialogProps {
		open?: boolean;
	}

	let { open = $bindable(false) }: ChangePasswordDialogProps = $props();

	let oldPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';

		if (!oldPassword.trim()) {
			error = '请输入原密码';
			return;
		}

		if (!newPassword.trim()) {
			error = '请输入新密码';
			return;
		}

		if (newPassword.length < 6) {
			error = '新密码长度至少为6位';
			return;
		}

		if (newPassword !== confirmPassword) {
			error = '两次输入的密码不一致';
			return;
		}

		loading = true;
		try {
			await changePasswordService(oldPassword, newPassword);
			// 成功
			open = false;
			oldPassword = '';
			newPassword = '';
			confirmPassword = '';
		} catch (err: any) {
			error = err.message || '修改密码失败';
		} finally {
			loading = false;
		}
	}

	function handleClose() {
		open = false;
		oldPassword = '';
		newPassword = '';
		confirmPassword = '';
		error = '';
	}
</script>

<Dialog bind:open>
	{#snippet children(open)}
		<DialogTitle>修改密码</DialogTitle>
		<DialogContent>
			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label for="oldPassword" class="mb-2 block text-sm font-medium">原密码</label>
					<Input
						id="oldPassword"
						type="password"
						bind:value={oldPassword}
						placeholder="请输入原密码"
						disabled={loading}
					/>
				</div>
				<div>
					<label for="newPassword" class="mb-2 block text-sm font-medium">新密码</label>
					<Input
						id="newPassword"
						type="password"
						bind:value={newPassword}
						placeholder="请输入新密码（至少6位）"
						disabled={loading}
					/>
				</div>
				<div>
					<label for="confirmPassword" class="mb-2 block text-sm font-medium">确认新密码</label>
					<Input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						placeholder="请再次输入新密码"
						disabled={loading}
					/>
				</div>
				{#if error}
					<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
				{/if}
				<div class="flex justify-end gap-2">
					<Button type="button" variant="outline" onclick={handleClose} disabled={loading}>
						{#snippet children()}
							取消
						{/snippet}
					</Button>
					<Button type="submit" disabled={loading}>
						{#snippet children()}
							{loading ? '提交中...' : '提交'}
						{/snippet}
					</Button>
				</div>
			</form>
		</DialogContent>
	{/snippet}
</Dialog>