/**
 * 认证 Store
 */
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { localStorage } from '$lib/utils/storage';
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

	return {
		isAuthenticated: !!(token && user),
		token,
		user
	};
}

// 初始化状态
function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(getInitialState());

	// 在客户端初始化时检查 token
	if (browser) {
		const token = localStorage.get<string>(TOKEN_KEY);
		const user = localStorage.get<UserInfo>(USER_KEY);
		if (token && user) {
			update((state) => ({
				...state,
				isAuthenticated: true,
				token,
				user
			}));
		}
	}

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

export const authStore = createAuthStore();
