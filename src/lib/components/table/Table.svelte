<script lang="ts">
	import { useTable } from '$lib/hooks/useTable';
	import type { TableConfig } from '$lib/types/table.types';
	import TableComponent from '$lib/components/ui/table/table.svelte';
	import TableHeader from '$lib/components/ui/table/table-header.svelte';
	import TableBody from '$lib/components/ui/table/table-body.svelte';
	import TableRow from '$lib/components/ui/table/table-row.svelte';
	import TableCell from '$lib/components/ui/table/table-cell.svelte';
	import TableHead from '$lib/components/ui/table/table-head.svelte';
	import * as Icons from 'lucide-svelte';

	interface TableProps<T = any> {
		config: TableConfig<T>;
		getRowKey?: (record: T, index: number) => string | number;
		fetchData?: (pagination: any, sorting: any) => Promise<{ data: T[]; total: number }>;
		class?: string;
	}

	let { config, getRowKey, fetchData, class: className = '' }: TableProps = $props();

	// 使用 $derived 确保响应式更新
	const table = $derived(useTable({
		columns: config.columns,
		data: config.data,
		fetchData,
		getRowKey
	}));

	function getIcon(iconName?: string) {
		if (!iconName) return null;
		const Icon = (Icons as any)[iconName];
		return Icon || null;
	}

	function renderCell(column: any, record: any, index: number) {
		if (column.render) {
			return column.render(column.dataIndex ? record[column.dataIndex] : null, record, index);
		}

		if (column.component) {
			const Icon = getIcon(column.component);
			if (Icon) {
				return Icon;
			}
		}

		const value = column.dataIndex ? record[column.dataIndex] : null;
		return value ?? '';
	}

	const getRowKeyFn = $derived(getRowKey || ((record: any, index: number) => index));
</script>

<TableComponent class={className}>
	{#snippet children()}
		<TableHeader>
			{#snippet children()}
				<TableRow>
					{#snippet children()}
						{#each table.columns as column (column.key)}
							<TableHead class={column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}>
								{#snippet children()}
									{column.title}
								{/snippet}
							</TableHead>
						{/each}
					{/snippet}
				</TableRow>
			{/snippet}
		</TableHeader>
		<TableBody>
			{#snippet children()}
				{#if table.loading}
					<TableRow>
						{#snippet children()}
							<TableCell class="text-center py-8">
								{#snippet children()}
									加载中...
								{/snippet}
							</TableCell>
						{/snippet}
					</TableRow>
				{:else if table.data.length === 0}
					<TableRow>
						{#snippet children()}
							<TableCell class="text-center py-8">
								{#snippet children()}
									暂无数据
								{/snippet}
							</TableCell>
						{/snippet}
					</TableRow>
				{:else}
					{#each table.data as record, index (getRowKeyFn(record, index))}
						<TableRow>
							{#snippet children()}
								{#each table.columns as column (column.key)}
									<TableCell class={column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}>
										{#snippet children()}
											{@const cellContent = renderCell(column, record, index)}
											{#if typeof cellContent === 'string' || typeof cellContent === 'number'}
												{cellContent}
											{:else}
												{@html String(cellContent)}
											{/if}
										{/snippet}
									</TableCell>
								{/each}
							{/snippet}
						</TableRow>
					{/each}
				{/if}
			{/snippet}
		</TableBody>
	{/snippet}
</TableComponent>