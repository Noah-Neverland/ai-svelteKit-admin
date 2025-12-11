<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import { TrendingUp, TrendingDown, Users, Eye, ShoppingCart, DollarSign } from 'lucide-svelte';

	interface StatCard {
		title: string;
		value: string | number;
		change?: string;
		trend?: 'up' | 'down';
		icon?: any;
		description?: string;
	}

	let stats: StatCard[] = $state([
		{
			title: '总用户数',
			value: '1,234',
			change: '+12.5%',
			trend: 'up',
			icon: Users,
			description: '较上月'
		},
		{
			title: '今日访问',
			value: '5,678',
			change: '+8.3%',
			trend: 'up',
			icon: Eye,
			description: '较昨日'
		},
		{
			title: '订单数',
			value: '8,901',
			change: '-2.1%',
			trend: 'down',
			icon: ShoppingCart,
			description: '较上月'
		},
		{
			title: '销售额',
			value: '¥123,456',
			change: '+15.2%',
			trend: 'up',
			icon: DollarSign,
			description: '较上月'
		}
	]);
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each stats as stat (stat.title)}
		<Card class="transition-all hover:shadow-md">
			{#snippet children()}
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					{#snippet children()}
						<CardTitle class="text-sm font-medium">{stat.title}</CardTitle>
					{/snippet}
				</CardHeader>
				<CardContent>
					{#snippet children()}
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<div class="text-2xl font-bold">{stat.value}</div>
								{#if stat.change}
									<p class="text-xs flex items-center gap-1 mt-1">
										{#if stat.trend === 'up'}
											<TrendingUp class="h-3 w-3 text-green-600 dark:text-green-400" />
											<span class="text-green-600 dark:text-green-400 font-medium">
												{stat.change}
											</span>
										{:else}
											<TrendingDown class="h-3 w-3 text-red-600 dark:text-red-400" />
											<span class="text-red-600 dark:text-red-400 font-medium">
												{stat.change}
											</span>
										{/if}
										<span class="text-muted-foreground">{stat.description}</span>
									</p>
								{/if}
							</div>
							{#if stat.icon}
								{@const Icon = stat.icon}
								<div class="rounded-full bg-primary/10 p-2">
									<Icon class="h-5 w-5 text-primary" />
								</div>
							{/if}
						</div>
					{/snippet}
				</CardContent>
			{/snippet}
		</Card>
	{/each}
</div>