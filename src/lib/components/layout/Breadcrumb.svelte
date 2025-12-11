<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { generateBreadcrumb } from '$lib/services/menu.service';
	import { ChevronRight, Home } from 'lucide-svelte';

	const breadcrumbItems = $derived.by(() => {
		const currentPath = $page.url.pathname;
		const items = generateBreadcrumb(currentPath);
		return items.length > 0 ? items : [];
	});
</script>

{#if breadcrumbItems.length > 0}
	<nav class="flex items-center gap-2 px-4 py-3 text-sm">
		<button
			type="button"
			class="flex items-center gap-1 text-muted-foreground hover:text-foreground"
			onclick={() => goto('/')}
		>
			<Home class="h-4 w-4" />
			<span>首页</span>
		</button>
		{#each breadcrumbItems as item, index (item.id)}
			<ChevronRight class="h-4 w-4 text-muted-foreground" />
			{#if index === breadcrumbItems.length - 1}
				<span class="text-foreground">{item.title}</span>
			{:else}
				<button
					type="button"
					class="text-muted-foreground hover:text-foreground"
					onclick={() => item.path && goto(item.path)}
				>
					{item.title}
				</button>
			{/if}
		{/each}
	</nav>
{/if}