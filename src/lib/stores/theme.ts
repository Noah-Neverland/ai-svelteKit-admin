/**
 * 主题 Store
 * 注意：在普通 .ts 文件中不能使用 runes，需要使用传统的 writable store
 */
import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import { localStorage } from '$lib/utils/storage';
import type { ThemeColor } from '$lib/config/theme.config';

const THEME_COLOR_KEY = 'theme_color';
const THEME_MODE_KEY = 'theme_mode';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
	themeColor: ThemeColor;
	themeMode: ThemeMode;
}

// 初始化状态（只在客户端初始化）
function getInitialState(): ThemeState {
	if (!browser) {
		return {
			themeColor: 'default',
			themeMode: 'light'
		};
	}

	const savedColor = localStorage.get<ThemeColor>(THEME_COLOR_KEY);
	const savedMode = localStorage.get<ThemeMode>(THEME_MODE_KEY);

	return {
		themeColor: savedColor || 'default',
		themeMode: savedMode || 'light'
	};
}

// 应用主题到 DOM
function applyTheme(themeColor: ThemeColor, themeMode: ThemeMode) {
	if (!browser) return;

	// 应用主题色
	document.documentElement.setAttribute('data-theme', themeColor);

	// 应用模式
	if (themeMode === 'system') {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		document.documentElement.classList.toggle('dark', prefersDark);
	} else {
		document.documentElement.classList.toggle('dark', themeMode === 'dark');
	}
}

// 创建 store
function createThemeStore() {
	const { subscribe, set, update } = writable<ThemeState>(getInitialState());

	// 初始化时应用主题
	if (browser) {
		const initialState = getInitialState();
		applyTheme(initialState.themeColor, initialState.themeMode);

		// 监听系统主题变化
		if (initialState.themeMode === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handler = (e: MediaQueryListEvent) => {
				document.documentElement.classList.toggle('dark', e.matches);
			};
			mediaQuery.addEventListener('change', handler);
		}
	}

	return {
		subscribe,
		setThemeColor: (color: ThemeColor) => {
			update((state) => {
				if (browser) {
					localStorage.set(THEME_COLOR_KEY, color);
					applyTheme(color, state.themeMode);
				}
				return { ...state, themeColor: color };
			});
		},
		setThemeMode: (mode: ThemeMode) => {
			update((state) => {
				if (browser) {
					localStorage.set(THEME_MODE_KEY, mode);
					applyTheme(state.themeColor, mode);

					// 监听系统主题变化
					if (mode === 'system') {
						const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
						const handler = (e: MediaQueryListEvent) => {
							document.documentElement.classList.toggle('dark', e.matches);
						};
						mediaQuery.addEventListener('change', handler);
					}
				}
				return { ...state, themeMode: mode };
			});
		}
	};
}

export const themeStore = createThemeStore();