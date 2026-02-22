<script lang="ts">
	import { t, getLocale, setLocale } from '$lib/i18n/index.svelte';
	import { page } from '$app/state';

	function toggleLang() {
		setLocale(getLocale() === 'zh' ? 'en' : 'zh');
	}

	let scrolled = $state(false);

	let path = $derived(page.url.pathname);

	function isActive(href: string): boolean {
		if (href === '/') return path === '/';
		return path.startsWith(href);
	}

	$effect(() => {
		const handler = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});
</script>

<nav class="pixel-nav" class:scrolled class:zh={getLocale() === 'zh'}>
	<a href="/" class="brand">PunkGo</a>
	<div class="nav-links">
		<a href="/" class:active={isActive('/')}>{t('nav.home')}</a>
		<a href="/whitepaper/" class:active={isActive('/whitepaper')}>{t('whitepaper.page_title')}</a>
		<a href="/showcase/" class:active={isActive('/showcase')}>{t('nav.showcase')}</a>
		<a href="https://github.com/PunkGo" target="_blank" rel="noopener noreferrer">GitHub</a>
		<button class="nes-btn is-success lang-btn" onclick={toggleLang}>
			{getLocale() === 'zh' ? 'EN' : '中'}
		</button>
	</div>
</nav>

<style>
	.pixel-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 24px;
		font-family: var(--font-pixel);
		font-size: 10px;
		transition: background 0.3s, border-color 0.3s;
		border-bottom: 2px solid transparent;
	}

	.pixel-nav.scrolled {
		background: rgba(10, 10, 10, 0.95);
		border-bottom-color: var(--neon-green);
		backdrop-filter: blur(4px);
	}

	.brand {
		color: var(--neon-green);
		font-size: 12px;
		text-shadow: 0 0 8px var(--pixel-shadow);
	}
	.brand:hover {
		color: var(--neon-pink);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.nav-links a {
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 1px;
		line-height: 1;
		font-size: 12px;
	}
	.nav-links a:hover {
		color: var(--neon-green);
		text-shadow: 0 0 8px var(--pixel-shadow);
	}
	.nav-links a.active {
		color: var(--neon-green);
		text-shadow: 0 0 8px var(--pixel-shadow);
	}

	/* Chinese ChillBitmap is visually smaller than Press Start 2P at same font-size */
	.pixel-nav.zh .nav-links a {
		font-size: 16px;
	}

	.nes-btn.lang-btn {
		font-family: var(--font-cjk);
		font-size: 14px;
		padding: 4px 10px;
		line-height: 1;
	}

	@media (max-width: 768px) {
		.pixel-nav {
			padding: 8px 12px;
			flex-wrap: wrap;
			gap: 4px 0;
		}
		.nav-links {
			gap: 10px;
			width: 100%;
			justify-content: flex-end;
			order: 1;
		}
		.nav-links a {
			font-size: 8px;
		}
		.pixel-nav.zh .nav-links a {
			font-size: 12px;
		}
	}
</style>
