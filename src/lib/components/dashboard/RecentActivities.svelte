<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Activity, LogIn, ShoppingBag, User, Shield, MessageSquare } from 'lucide-svelte';

	interface ActivityItem {
		id: string;
		action: string;
		time: string;
		type: 'login' | 'order' | 'user' | 'system' | 'feedback';
		user?: string;
	}

	const getActivityIcon = (type: ActivityItem['type']) => {
		switch (type) {
			case 'login':
				return LogIn;
			case 'order':
				return ShoppingBag;
			case 'user':
				return User;
			case 'system':
				return Shield;
			case 'feedback':
				return MessageSquare;
			default:
				return Activity;
		}
	};

	const getActivityColor = (type: ActivityItem['type']) => {
		switch (type) {
			case 'login':
				return 'bg-blue-500';
			case 'order':
				return 'bg-green-500';
			case 'user':
				return 'bg-purple-500';
			case 'system':
				return 'bg-orange-500';
			case 'feedback':
				return 'bg-pink-500';
			default:
				return 'bg-gray-500';
		}
	};

	let activities: ActivityItem[] = $state([
		{ id: '1', action: '登录了系统', time: '2分钟前', type: 'login', user: 'Admin' },
		{ id: '2', action: '创建了新订单 #12345', time: '15分钟前', type: 'order', user: 'User1' },
		{ id: '3', action: '更新了个人信息', time: '1小时前', type: 'user', user: 'User2' },
		{ id: '4', action: '修改了角色权限', time: '2小时前', type: 'system', user: '系统管理员' },
		{ id: '5', action: '提交了反馈', time: '3小时前', type: 'feedback', user: 'User3' }
	]);
</script>

<Card>
	{#snippet children()}
		<CardHeader>
			{#snippet children()}
				<CardTitle>最近活动</CardTitle>
				<CardDescription>系统最近的活动记录</CardDescription>
			{/snippet}
		</CardHeader>
		<CardContent>
			{#snippet children()}
				<div class="space-y-4">
					{#each activities as activity, index (activity.id)}
						<div class="flex items-start gap-3 group">
							<Avatar class="h-9 w-9">
								{#snippet children()}
									<AvatarFallback class={getActivityColor(activity.type)}>
										{@const Icon = getActivityIcon(activity.type)}
										<Icon class="h-4 w-4 text-white" />
									</AvatarFallback>
								{/snippet}
							</Avatar>
							<div class="flex-1 space-y-1">
								<div class="flex items-center gap-2">
									<p class="text-sm font-medium">{activity.user}</p>
									<p class="text-sm text-muted-foreground">{activity.action}</p>
								</div>
								<div class="flex items-center gap-2">
									<p class="text-xs text-muted-foreground">{activity.time}</p>
									<Badge variant="outline" class="text-xs">
										{activity.type === 'login' && '登录'}
										{activity.type === 'order' && '订单'}
										{activity.type === 'user' && '用户'}
										{activity.type === 'system' && '系统'}
										{activity.type === 'feedback' && '反馈'}
									</Badge>
								</div>
							</div>
						</div>
						{#if index < activities.length - 1}
							<Separator class="my-4" />
						{/if}
					{/each}
				</div>
				<Separator class="my-4" />
				<div class="flex justify-center">
					<Button variant="ghost" size="sm">
						查看更多
					</Button>
				</div>
			{/snippet}
		</CardContent>
	{/snippet}
</Card>