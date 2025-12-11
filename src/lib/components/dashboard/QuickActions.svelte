<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import { Plus, Users, BarChart, Settings, Shield, FileText } from 'lucide-svelte';

	interface QuickAction {
		id: string;
		title: string;
		icon: any;
		path?: string;
		onClick?: () => void;
	}

	let actions: QuickAction[] = $state([
		{ id: '1', title: '添加用户', icon: Plus, path: '/system/user/add' },
		{ id: '2', title: '用户管理', icon: Users, path: '/system/user' },
		{ id: '3', title: '数据报表', icon: BarChart, path: '/analytics/reports' },
		{ id: '4', title: '系统设置', icon: Settings, path: '/system/settings' },
		{ id: '5', title: '权限管理', icon: Shield, path: '/system/role' },
		{ id: '6', title: '日志查看', icon: FileText, path: '/system/logs' }
	]);

	function handleClick(action: QuickAction) {
		if (action.path) {
			goto(action.path);
		} else if (action.onClick) {
			action.onClick();
		}
	}
</script>

<Card>
	{#snippet children()}
		<CardHeader>
			{#snippet children()}
				<CardTitle>快捷操作</CardTitle>
			{/snippet}
		</CardHeader>
		<CardContent>
			{#snippet children()}
				<div class="grid grid-cols-3 gap-4">
					{#each actions as action (action.id)}
						{@const Icon = action.icon}
						<button
							type="button"
							class="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
							onclick={() => handleClick(action)}
						>
							<Icon class="h-6 w-6" />
							<span class="text-sm">{action.title}</span>
						</button>
					{/each}
				</div>
			{/snippet}
		</CardContent>
	{/snippet}
</Card>