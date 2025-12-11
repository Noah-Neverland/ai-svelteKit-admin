<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import { BarChart3 } from 'lucide-svelte';
</script>

<Card>
	{#snippet children()}
		<CardHeader>
			{#snippet children()}
				<div class="flex items-center justify-between">
					<div>
						<CardTitle>访问量趋势</CardTitle>
						<CardDescription>过去30天的访问量统计</CardDescription>
					</div>
					<BarChart3 class="h-5 w-5 text-muted-foreground" />
				</div>
			{/snippet}
		</CardHeader>
		<CardContent>
			{#snippet children()}
				<div class="h-[300px] flex items-center justify-center">
					<!-- 模拟图表数据 -->
					<div class="w-full h-full flex flex-col justify-end gap-2">
						<div class="flex items-end justify-between gap-1 h-full">
							{#each Array(30) as _, i}
								{@const height = Math.floor(Math.random() * 80) + 20}
								<div
									class="bg-primary rounded-t transition-all hover:opacity-80 flex-1"
									style="height: {height}%"
									title="第 {i + 1} 天: {height}%"
								></div>
							{/each}
						</div>
						<div class="flex justify-between text-xs text-muted-foreground mt-2">
							<span>30天前</span>
							<span>今天</span>
						</div>
					</div>
				</div>
			{/snippet}
		</CardContent>
	{/snippet}
</Card>