<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import { i18nStore } from '$lib/stores/i18n';
	import { THEME_COLORS } from '$lib/config/theme.config';
	import { X, Sun, Moon, Monitor } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	interface SettingsDrawerProps {
		open?: boolean;
	}

	let { open = $bindable(false) }: SettingsDrawerProps = $props();
</script>

{#if open}
	<div class="fixed inset-0 z-50">
		<div class="fixed inset-0 bg-black/50" onclick={() => (open = false)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && (open = false)}></div>
		<div class="fixed right-0 top-0 h-full w-80 bg-white shadow-xl dark:bg-gray-800">
			<div class="flex h-16 items-center justify-between border-b px-4">
				<h2 class="text-lg font-semibold">设置</h2>
				<button type="button" class="rounded-md p-1 hover:bg-accent" onclick={() => (open = false)}>
					<X class="h-5 w-5" />
				</button>
			</div>

			<div class="overflow-y-auto p-4">
				<!-- 语言设置 -->
				<div class="mb-6">
					<h3 class="mb-3 text-sm font-medium">🌐 语言设置</h3>
					<div class="flex gap-2">
						<Button
							variant={$i18nStore === 'zh' ? 'default' : 'outline'}
							size="sm"
							onclick={() => i18nStore.setLocale('zh')}
						>
							{#snippet children()}
								中文简体
							{/snippet}
						</Button>
						<Button
							variant={$i18nStore === 'en' ? 'default' : 'outline'}
							size="sm"
							onclick={() => i18nStore.setLocale('en')}
						>
							{#snippet children()}
								English
							{/snippet}
						</Button>
					</div>
				</div>

				<!-- 主题色设置 -->
				<div class="mb-6">
					<h3 class="mb-3 text-sm font-medium">🎨 主题色</h3>
					<div class="grid grid-cols-4 gap-2">
						{#each THEME_COLORS as color}
							<button
								type="button"
								class="h-10 rounded-md border-2 {$themeStore.themeColor === color.value
									? 'border-primary'
									: 'border-transparent'}"
								onclick={() => themeStore.setThemeColor(color.value)}
								title={color.label}
							>
								{color.value === $themeStore.themeColor ? '✓' : ''}
							</button>
						{/each}
					</div>
				</div>

				<!-- 模式设置 -->
				<div class="mb-6">
					<h3 class="mb-3 text-sm font-medium">🌙 模式设置</h3>
					<div class="flex flex-col gap-2">
						<Button
							variant={$themeStore.themeMode === 'light' ? 'default' : 'outline'}
							class="justify-start"
							onclick={() => themeStore.setThemeMode('light')}
						>
							{#snippet children()}
								<Sun class="mr-2 h-4 w-4" />
								亮色模式
							{/snippet}
						</Button>
						<Button
							variant={$themeStore.themeMode === 'dark' ? 'default' : 'outline'}
							class="justify-start"
							onclick={() => themeStore.setThemeMode('dark')}
						>
							{#snippet children()}
								<Moon class="mr-2 h-4 w-4" />
								暗色模式
							{/snippet}
						</Button>
						<Button
							variant={$themeStore.themeMode === 'system' ? 'default' : 'outline'}
							class="justify-start"
							onclick={() => themeStore.setThemeMode('system')}
						>
							{#snippet children()}
								<Monitor class="mr-2 h-4 w-4" />
								跟随系统
							{/snippet}
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}