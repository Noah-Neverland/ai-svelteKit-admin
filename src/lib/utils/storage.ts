/**
 * 本地存储工具函数
 * 封装 localStorage 和 sessionStorage
 * 支持 SSR（服务端渲染）
 */

type StorageType = 'localStorage' | 'sessionStorage';

/**
 * 检查是否在浏览器环境
 */
function isBrowser(): boolean {
	return typeof window !== 'undefined';
}

/**
 * 获取存储对象
 */
function getStorage(type: StorageType): globalThis.Storage | null {
	if (!isBrowser()) return null;
	return type === 'localStorage' ? window.localStorage : window.sessionStorage;
}

class Storage {
	private type: StorageType;

	constructor(type: StorageType = 'localStorage') {
		this.type = type;
	}

	/**
	 * 获取存储对象
	 */
	private getStorage(): globalThis.Storage | null {
		return getStorage(this.type);
	}

	/**
	 * 获取存储值
	 */
	get<T = any>(key: string): T | null {
		if (!isBrowser()) return null;
		try {
			const storage = this.getStorage();
			if (!storage) return null;
			const item = storage.getItem(key);
			if (item === null) return null;
			return JSON.parse(item) as T;
		} catch (error) {
			console.error(`Error getting storage key "${key}":`, error);
			return null;
		}
	}

	/**
	 * 设置存储值
	 */
	set<T = any>(key: string, value: T): boolean {
		if (!isBrowser()) return false;
		try {
			const storage = this.getStorage();
			if (!storage) return false;
			storage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			console.error(`Error setting storage key "${key}":`, error);
			return false;
		}
	}

	/**
	 * 删除存储值
	 */
	remove(key: string): boolean {
		if (!isBrowser()) return false;
		try {
			const storage = this.getStorage();
			if (!storage) return false;
			storage.removeItem(key);
			return true;
		} catch (error) {
			console.error(`Error removing storage key "${key}":`, error);
			return false;
		}
	}

	/**
	 * 清空所有存储
	 */
	clear(): boolean {
		if (!isBrowser()) return false;
		try {
			const storage = this.getStorage();
			if (!storage) return false;
			storage.clear();
			return true;
		} catch (error) {
			console.error('Error clearing storage:', error);
			return false;
		}
	}

	/**
	 * 检查 key 是否存在
	 */
	has(key: string): boolean {
		if (!isBrowser()) return false;
		const storage = this.getStorage();
		if (!storage) return false;
		return storage.getItem(key) !== null;
	}
}

// 导出单例（延迟初始化，避免 SSR 问题）
export const localStorage = new Storage('localStorage');
export const sessionStorage = new Storage('sessionStorage');

// 导出类以便创建自定义实例
export { Storage };
