import zh from './zh.json';
import en from './en.json';

type Locale = 'zh' | 'en';

const messages: Record<Locale, Record<string, any>> = { zh, en };

let locale = $state<Locale>('en');

export function getLocale(): Locale {
	return locale;
}

export function setLocale(l: Locale): void {
	locale = l;
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('punkgo-locale', l);
	}
}

export function initLocale(): void {
	if (typeof localStorage !== 'undefined') {
		const saved = localStorage.getItem('punkgo-locale');
		if (saved === 'zh' || saved === 'en') {
			locale = saved;
		}
	}
}

export function t(key: string): any {
	const keys = key.split('.');
	let value: any = messages[locale];
	for (const k of keys) {
		value = value?.[k];
	}
	return value ?? key;
}
