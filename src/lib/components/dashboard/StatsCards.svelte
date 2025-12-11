<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import { TrendingUp, TrendingDown, Users, Eye, ShoppingCart, DollarSign } from 'lucide-svelte';

	interface StatCard {
		title: string;
		value: string | number;
		change?: string;
		trend?: 'up' | 'down';
		icon?: any;
	}

	let stats: StatCard[] = $state([
		{
			title: '总用户数',
			value: '1,234',
			change: '+12.5%',
			trend: 'up',
			icon: Users
		},
		{
			title: '今日访问',
			value: '5,678',
			change: '+8.3%',
			trend: 'up',
			icon: Eye
		},
		{
			title: '订单数',
			value: '8,901',
			change: '-2.1%',
			trend: 'down',
			icon: ShoppingCart
		},
		{
			title: '销售额',
			value: '¥123,456',
			change: '+15.2%',
			trend: 'up',
			icon: DollarSign
		}
	]);
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each stats as stat (stat.title)}
		<Card>
			{#snippet children()}
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					{#snippet children()}
						<CardTitle class="text-sm font-medium">{stat.title}</CardTitle>
						{#if stat.icon}
							{@const Icon = stat.icon}
							<Icon class="h-4 w-4 text-muted-foreground" />
						{/if}
					{/snippet}
				</CardHeader>
				<CardContent>
					{#snippet children()}
						<div class="text-2xl font-bold">{stat.value}</div>
						{#if stat.change}
							<p class="text-xs text-muted-foreground flex items-center gap-1 mt-1">
								{#if stat.trend === 'up'}
									<TrendingUp class="h-3 w-3 text-green-500" />
								{:else}
									<TrendingDown class="h-3 w-3 text-red-500" />
								{/if}
								<span class={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
									{stat.change}
								</span>
								<span>较上月</span>
							</p>
						{/if}
					{/snippet}
				</CardContent>
			{/snippet}
		</Card>
	{/each}
</div>