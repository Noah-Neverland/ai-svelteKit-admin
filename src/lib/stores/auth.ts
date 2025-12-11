/**
 * 认证 Store
 * 注意：在普通 .ts 文件中不能使用 runes，需要使用传统的 writable store
 */
import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import { localStorage, sessionStorage } from '$lib/utils/storage';
import type { UserInfo } from '$lib/types/auth.types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_info';

interface AuthState {
	isAuthenticated: boolean;
	token: string | null;
	user: UserInfo | null;
}

// 初始化状态（只在客户端初始化）
function getInitialState(): AuthState {
	if (!browser) {
		return {
			isAuthenticated: false,
			token: null,
			user: null
		};
	}

	const token = localStorage.get<string>(TOKEN_KEY);
	const user = localStorage.get<UserInfo>(USER_KEY);

	if (token && user) {
		return {
			isAuthenticated: true,
			token,
			user
		};
	}

	// 尝试从 sessionStorage 加载
	const sessionToken = sessionStorage.get<string>(TOKEN_KEY);
	const sessionUser = sessionStorage.get<UserInfo>(USER_KEY);
	if (sessionToken && sessionUser) {
		return {
			isAuthenticated: true,
			token: sessionToken,
			user: sessionUser
		};
	}

	return {
		isAuthenticated: false,
		token: null,
		user: null
	};
}

// 创建 store
function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(getInitialState());

	return {
		subscribe,
		/**
		 * 登录
		 */
		login: (token: string, user: UserInfo, rememberMe: boolean = false) => {
			if (rememberMe) {
				localStorage.set(TOKEN_KEY, token);
				localStorage.set(USER_KEY, user);
			} else {
				sessionStorage.set(TOKEN_KEY, token);
				sessionStorage.set(USER_KEY, user);
			}

			set({
				isAuthenticated: true,
				token,
				user
			});
		},
		/**
		 * 退出登录
		 */
		logout: () => {
			localStorage.remove(TOKEN_KEY);
			localStorage.remove(USER_KEY);
			sessionStorage.remove(TOKEN_KEY);
			sessionStorage.remove(USER_KEY);

			set({
				isAuthenticated: false,
				token: null,
				user: null
			});
		},
		/**
		 * 更新用户信息
		 */
		updateUser: (user: UserInfo) => {
			localStorage.set(USER_KEY, user);
			sessionStorage.set(USER_KEY, user);

			update((state) => ({
				...state,
				user
			}));
		}
	};
}

// 导出 store
export const authStore = createAuthStore();

// 为了在组件中更方便地访问，导出一个包含 getter 的对象
// 在组件中可以使用 $authStore.isAuthenticated 语法
export const auth = {
	get isAuthenticated() {
		let value: boolean = false;
		authStore.subscribe((state) => {
			value = state.isAuthenticated;
		})();
		return value;
	},
	get token() {
		let value: string | null = null;
		authStore.subscribe((state) => {
			value = state.token;
		})();
		return value;
	},
	get user() {
		let value: UserInfo | null = null;
		authStore.subscribe((state) => {
			value = state.user;
		})();
		return value;
	},
	login: authStore.login.bind(authStore),
	logout: authStore.logout.bind(authStore),
	updateUser: authStore.updateUser.bind(authStore)
};
