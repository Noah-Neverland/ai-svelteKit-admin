/**
 * useTable Hook
 * 表格状态管理
 */
import type { TableColumn, PaginationConfig, SortConfig } from '$lib/types/table.types';

export interface UseTableReturn<T = any> {
	data: T[];
	columns: TableColumn<T>[];
	pagination: PaginationConfig;
	sorting: SortConfig | null;
	loading: boolean;
	selectedKeys: Set<string | number>;
	setData: (data: T[]) => void;
	setPagination: (pagination: Partial<PaginationConfig>) => void;
	setSorting: (sorting: SortConfig | null) => void;
	setLoading: (loading: boolean) => void;
	toggleSelect: (key: string | number) => void;
	selectAll: () => void;
	clearSelection: () => void;
	refresh: () => Promise<void>;
}

export function useTable<T extends Record<string, any>>(
	config: {
		columns: TableColumn<T>[];
		data?: T[];
		fetchData?: (pagination: PaginationConfig, sorting: SortConfig | null) => Promise<{ data: T[]; total: number }>;
		getRowKey?: (record: T, index: number) => string | number;
	}
): UseTableReturn<T> {
	const columns = $state(config.columns);
	let data = $state<T[]>(config.data || []);
	let pagination = $state<PaginationConfig>({
		current: 1,
		pageSize: 10,
		total: 0
	});
	let sorting = $state<SortConfig | null>(null);
	let loading = $state(false);
	let selectedKeys = $state<Set<string | number>>(new Set());

	function setData(newData: T[]) {
		data = newData;
	}

	function setPagination(newPagination: Partial<PaginationConfig>) {
		pagination = { ...pagination, ...newPagination };
	}

	function setSorting(newSorting: SortConfig | null) {
		sorting = newSorting;
	}

	function setLoading(newLoading: boolean) {
		loading = newLoading;
	}

	function toggleSelect(key: string | number) {
		if (selectedKeys.has(key)) {
			selectedKeys.delete(key);
		} else {
			selectedKeys.add(key);
		}
		selectedKeys = new Set(selectedKeys);
	}

	function selectAll() {
		const keys = data.map((record, index) => {
			if (config.getRowKey) {
				return config.getRowKey(record, index);
			}
			return (record as any).id || index;
		});
		selectedKeys = new Set(keys);
	}

	function clearSelection() {
		selectedKeys = new Set();
	}

	async function refresh() {
		const fetchDataFn = config.fetchData;
		if (!fetchDataFn) return;

		loading = true;
		try {
			const result = await fetchDataFn(pagination, sorting);
			data = result.data;
			pagination.total = result.total;
		} catch (error) {
			console.error('Table refresh error:', error);
		} finally {
			loading = false;
		}
	}

	// 初始化时加载数据
	const fetchDataFn = config.fetchData;
	if (fetchDataFn) {
		$effect(() => {
			refresh();
		});
	}

	return {
		data,
		columns,
		pagination,
		sorting,
		loading,
		selectedKeys,
		setData,
		setPagination,
		setSorting,
		setLoading,
		toggleSelect,
		selectAll,
		clearSelection,
		refresh
	};
}