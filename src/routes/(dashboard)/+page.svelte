<script lang="ts">
	import StatsCards from '$lib/components/dashboard/StatsCards.svelte';
	import ChartSection from '$lib/components/dashboard/ChartSection.svelte';
	import RecentActivities from '$lib/components/dashboard/RecentActivities.svelte';
	import QuickActions from '$lib/components/dashboard/QuickActions.svelte';
</script>

<div class="space-y-6">
	<StatsCards />
	<div class="grid gap-6 md:grid-cols-2">
		<ChartSection />
		<RecentActivities />
	</div>
	<QuickActions />
</div>