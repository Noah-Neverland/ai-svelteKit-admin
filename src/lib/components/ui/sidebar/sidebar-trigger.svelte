<script lang="ts">
	import { getContext } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Menu } from 'lucide-svelte';

	const SIDEBAR_CONTEXT_KEY = Symbol('sidebar');

	interface SidebarContext {
		open: () => boolean;
		setOpen: (open: boolean) => void;
		toggle: () => void;
		isMobile: () => boolean;
		getState: () => 'expanded' | 'collapsed';
	}

	const context = getContext<SidebarContext>(SIDEBAR_CONTEXT_KEY);
	if (!context) {
		throw new Error('Sidebar.Trigger must be used within Sidebar.Provider');
	}

	const { toggle } = context;
</script>

<Button variant="ghost" size="icon" onclick={toggle}>
	{#snippet children()}
		<Menu class="h-5 w-5" />
	{/snippet}
</Button>
