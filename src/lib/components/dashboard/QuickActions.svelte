<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Users, BarChart, Settings, Shield, FileText } from 'lucide-svelte';

	interface QuickAction {
		id: string;
		title: string;
		icon: any;
		path?: string;
		onClick?: () => void;
		variant?: 'default' | 'outline' | 'secondary';
	}

	let actions: QuickAction[] = $state([
		{ id: '1', title: '添加用户', icon: Plus, path: '/system/user/add', variant: 'default' },
		{ id: '2', title: '用户管理', icon: Users, path: '/system/user', variant: 'outline' },
		{ id: '3', title: '数据报表', icon: BarChart, path: '/analytics/reports', variant: 'outline' },
		{ id: '4', title: '系统设置', icon: Settings, path: '/system/settings', variant: 'outline' },
		{ id: '5', title: '权限管理', icon: Shield, path: '/system/role', variant: 'outline' },
		{ id: '6', title: '日志查看', icon: FileText, path: '/system/logs', variant: 'outline' }
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
				<CardDescription>常用功能的快速入口</CardDescription>
			{/snippet}
		</CardHeader>
		<CardContent>
			{#snippet children()}
				<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
					{#each actions as action (action.id)}
						{@const Icon = action.icon}
						<Button
							variant={action.variant || 'outline'}
							class="h-auto flex-col gap-2 py-4 px-3"
							onclick={() => handleClick(action)}
						>
							<Icon class="h-5 w-5" />
							<span class="text-xs font-normal">{action.title}</span>
						</Button>
					{/each}
				</div>
			{/snippet}
		</CardContent>
	{/snippet}
</Card>