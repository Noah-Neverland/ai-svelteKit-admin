<script lang="ts">
	import StatsCards from '$lib/components/dashboard/StatsCards.svelte';
	import ChartSection from '$lib/components/dashboard/ChartSection.svelte';
	import RecentActivities from '$lib/components/dashboard/RecentActivities.svelte';
	import QuickActions from '$lib/components/dashboard/QuickActions.svelte';
</script>

<div class="flex-1 space-y-6 p-6">
	<div>
		<h2 class="text-3xl font-bold tracking-tight">仪表盘</h2>
		<p class="text-muted-foreground">欢迎回来，这里是您的系统概览</p>
	</div>
	<StatsCards />
	<div class="grid gap-6 md:grid-cols-2">
		<ChartSection />
		<RecentActivities />
	</div>
	<QuickActions />
</div>