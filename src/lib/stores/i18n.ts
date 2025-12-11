/**
 * 国际化 Store
 * 注意：在普通 .ts 文件中不能使用 runes，需要使用传统的 writable store
 */
import { writable, derived, type Writable, type Readable } from 'svelte/store';
import { browser } from '$app/environment';
import { localStorage } from '$lib/utils/storage';

export type Locale = 'zh' | 'en';

const LOCALE_KEY = 'locale';
const DEFAULT_LOCALE: Locale = 'zh';

// 翻译内容
const translations: Record<Locale, Record<string, string>> = {
	zh: {
		'app.name': '后台管理系统',
		'common.save': '保存',
		'common.cancel': '取消',
		'common.delete': '删除',
		'common.edit': '编辑',
		'common.add': '添加',
		'common.search': '搜索',
		'common.submit': '提交',
		'common.reset': '重置',
		'common.confirm': '确认',
		'common.back': '返回',
		'common.next': '下一步',
		'common.previous': '上一步',
		'menu.home': '首页',
		'menu.system': '系统管理',
		'menu.user': '用户管理',
		'menu.role': '角色管理',
		'menu.settings': '系统设置',
		'user.logout': '退出登录',
		'user.changePassword': '修改密码',
		'theme.light': '亮色模式',
		'theme.dark': '暗色模式',
		'theme.system': '跟随系统',
		'language.zh': '中文简体',
		'language.en': 'English'
	},
	en: {
		'app.name': 'Admin System',
		'common.save': 'Save',
		'common.cancel': 'Cancel',
		'common.delete': 'Delete',
		'common.edit': 'Edit',
		'common.add': 'Add',
		'common.search': 'Search',
		'common.submit': 'Submit',
		'common.reset': 'Reset',
		'common.confirm': 'Confirm',
		'common.back': 'Back',
		'common.next': 'Next',
		'common.previous': 'Previous',
		'menu.home': 'Home',
		'menu.system': 'System',
		'menu.user': 'User Management',
		'menu.role': 'Role Management',
		'menu.settings': 'Settings',
		'user.logout': 'Logout',
		'user.changePassword': 'Change Password',
		'theme.light': 'Light Mode',
		'theme.dark': 'Dark Mode',
		'theme.system': 'System',
		'language.zh': '中文简体',
		'language.en': 'English'
	}
};

// 初始化状态（只在客户端初始化）
function getInitialLocale(): Locale {
	if (!browser) {
		return DEFAULT_LOCALE;
	}

	const savedLocale = localStorage.get<Locale>(LOCALE_KEY);
	if (savedLocale && (savedLocale === 'zh' || savedLocale === 'en')) {
		return savedLocale;
	}

	return DEFAULT_LOCALE;
}

// 创建 store
function createI18nStore() {
	const { subscribe, set, update } = writable<Locale>(getInitialLocale());

	return {
		subscribe,
		setLocale: (locale: Locale) => {
			if (browser) {
				localStorage.set(LOCALE_KEY, locale);
			}
			set(locale);
		}
	};
}

export const i18nStore = createI18nStore();

// 导出翻译函数（derived store）
export const t: Readable<(key: string) => string> = derived(i18nStore, ($locale) => {
	return (key: string): string => {
		return translations[$locale][key] || key;
	};
});

// 导出便捷的翻译函数（用于在组件中使用 $t('key')）
export function getT(locale: Locale) {
	return (key: string): string => {
		return translations[locale][key] || key;
	};
}