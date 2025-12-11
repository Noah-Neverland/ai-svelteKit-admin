<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';

	interface Activity {
		id: string;
		action: string;
		time: string;
	}

	let activities: Activity[] = $state([
		{ id: '1', action: '用户 Admin 登录了系统', time: '2分钟前' },
		{ id: '2', action: '用户 User1 创建了新订单 #12345', time: '15分钟前' },
		{ id: '3', action: '用户 User2 更新了个人信息', time: '1小时前' },
		{ id: '4', action: '系统管理员修改了角色权限', time: '2小时前' },
		{ id: '5', action: '用户 User3 提交了反馈', time: '3小时前' }
	]);
</script>

<Card>
	{#snippet children()}
		<CardHeader>
			{#snippet children()}
				<CardTitle>最近活动</CardTitle>
			{/snippet}
		</CardHeader>
		<CardContent>
			{#snippet children()}
				<div class="space-y-4">
					{#each activities as activity (activity.id)}
						<div class="flex items-start gap-3">
							<div class="h-2 w-2 rounded-full bg-primary mt-2"></div>
							<div class="flex-1">
								<p class="text-sm">{activity.action}</p>
								<p class="text-xs text-muted-foreground mt-1">{activity.time}</p>
							</div>
						</div>
					{/each}
				</div>
				<div class="mt-4 text-center">
					<button type="button" class="text-sm text-primary hover:underline">查看更多</button>
				</div>
			{/snippet}
		</CardContent>
	{/snippet}
</Card>