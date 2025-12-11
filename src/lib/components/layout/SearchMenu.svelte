<script lang="ts">
	import { goto } from '$app/navigation';
	import { menuStore, filteredMenuItems } from '$lib/stores/menu';
	import { Search, X } from 'lucide-svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { MenuItem } from '$lib/types/menu.types';

	interface SearchMenuProps {
		open?: boolean;
	}

	let { open = $bindable(false) }: SearchMenuProps = $props();

	let searchKeyword = $state('');
	let selectedIndex = $state(0);

	$effect(() => {
		if (open) {
			searchKeyword = $menuStore.searchKeyword;
		}
	});

	$effect(() => {
		if (open) {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					open = false;
				} else if (e.key === 'ArrowDown') {
					e.preventDefault();
					selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
				} else if (e.key === 'ArrowUp') {
					e.preventDefault();
					selectedIndex = Math.max(selectedIndex - 1, 0);
				} else if (e.key === 'Enter' && searchResults.length > 0) {
					e.preventDefault();
					handleSelect(searchResults[selectedIndex]);
				}
			};

			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}
	});

	// 监听 Ctrl/Cmd + K
	$effect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				open = !open;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	const searchResults = $derived.by(() => {
		if (!searchKeyword.trim()) {
			return [];
		}

		const keyword = searchKeyword.toLowerCase();
		const results: Array<{ item: MenuItem; breadcrumb: MenuItem[] }> = [];

		function searchItems(items: MenuItem[], breadcrumb: MenuItem[] = []) {
			for (const item of items) {
				const matches =
					item.title.toLowerCase().includes(keyword) || item.path?.toLowerCase().includes(keyword);
				const currentBreadcrumb = [...breadcrumb, item];

				if (matches && item.path) {
					results.push({ item, breadcrumb: currentBreadcrumb });
				}

				if (item.children) {
					searchItems(item.children, currentBreadcrumb);
				}
			}
		}

		searchItems($filteredMenuItems);
		return results;
	});

	function handleSelect(result: { item: MenuItem; breadcrumb: MenuItem[] }) {
		if (result.item.path) {
			goto(result.item.path);
			open = false;
			searchKeyword = '';
		}
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		searchKeyword = target.value;
		menuStore.setSearchKeyword(target.value);
		selectedIndex = 0;
	}
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-start justify-center pt-20">
		<div class="fixed inset-0 bg-black/50" onclick={() => (open = false)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && (open = false)}></div>
		<div class="relative z-50 w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-800">
			<div class="flex items-center gap-2 border-b p-4">
				<Search class="h-5 w-5 text-muted-foreground" />
				<Input
					type="text"
					placeholder="搜索菜单..."
					value={searchKeyword}
					oninput={handleInput}
					class="flex-1 border-0 focus-visible:ring-0"
				/>
				<button
					type="button"
					class="rounded-md p-1 hover:bg-accent"
					onclick={() => (open = false)}
				>
					<X class="h-4 w-4" />
				</button>
			</div>

			<div class="max-h-96 overflow-y-auto p-2">
				{#if searchResults.length > 0}
					{#each searchResults as result, index (result.item.id)}
						<button
							type="button"
							class="w-full rounded-md p-3 text-left hover:bg-accent {index === selectedIndex
								? 'bg-accent'
								: ''}"
							onclick={() => handleSelect(result)}
						>
							<div class="flex items-center gap-2">
								<span class="font-medium">{result.item.title}</span>
							</div>
							{#if result.breadcrumb.length > 1}
								<div class="mt-1 text-xs text-muted-foreground">
									{result.breadcrumb.map((item) => item.title).join(' > ')}
								</div>
							{/if}
						</button>
					{/each}
				{:else if searchKeyword.trim()}
					<div class="p-4 text-center text-sm text-muted-foreground">未找到匹配的菜单项</div>
				{:else}
					<div class="p-4 text-center text-sm text-muted-foreground">输入关键词搜索菜单</div>
				{/if}
			</div>

			<div class="border-t p-2 text-xs text-muted-foreground">
				<div class="flex items-center justify-between">
					<span>使用 ↑↓ 选择，Enter 跳转，Esc 关闭</span>
					<span>Ctrl/Cmd + K 打开搜索</span>
				</div>
			</div>
		</div>
	</div>
{/if}