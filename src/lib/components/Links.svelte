<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<div class="links">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('links.title')}</h2>

	<div class="link-grid">
		<a
			href="https://github.com/PunkGo/punkgo-kernel"
			target="_blank"
			rel="noopener noreferrer"
			class="nes-btn is-success link-btn"
		>
			<span class="link-icon">&gt;_</span>
			<span class="link-text">{t('links.github')}</span>
		</a>

		<a
			href="https://github.com/PunkGo/punkgo-kernel/blob/main/docs/PunkGo_Whitepaper_EN.md"
			target="_blank"
			rel="noopener noreferrer"
			class="nes-btn is-success link-btn"
		>
			<span class="link-icon">&#9638;</span>
			<span class="link-text">{t('links.whitepaper')} (EN)</span>
		</a>

		<a
			href="https://github.com/PunkGo/punkgo-kernel/blob/main/docs/PunkGo_Whitepaper_ZH.md"
			target="_blank"
			rel="noopener noreferrer"
			class="nes-btn is-success link-btn"
		>
			<span class="link-icon">&#9638;</span>
			<span class="link-text">{t('links.whitepaper')} (ZH)</span>
		</a>

		<a
			href="https://github.com/PunkGo/punkgo-kernel/blob/main/docs/PIP-001_EN.md"
			target="_blank"
			rel="noopener noreferrer"
			class="nes-btn is-success link-btn"
		>
			<span class="link-icon">&#9881;</span>
			<span class="link-text">{t('links.pip001')}</span>
		</a>
	</div>
</div>

<style>
	.links {
		padding: var(--space-md) 0;
	}

	.divider {
		font-family: monospace;
		color: var(--text-dim);
		text-align: center;
		font-size: 0.8rem;
		margin-bottom: var(--space-md);
		opacity: 0.4;
		overflow: hidden;
	}

	.section-title {
		font-family: var(--font-pixel);
		font-size: clamp(12px, 2vw, 16px);
		color: var(--neon-green);
		margin-bottom: var(--space-md);
		text-shadow: 0 0 10px var(--pixel-shadow);
	}

	.link-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-sm);
	}

	.nes-btn.link-btn {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: var(--space-sm) var(--space-md);
		text-decoration: none;
		width: 100%;
		box-sizing: border-box;
	}

	.link-icon {
		font-family: var(--font-terminal);
		font-size: 1.4rem;
		flex-shrink: 0;
	}

	.link-text {
		font-family: var(--font-pixel);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	@media (max-width: 600px) {
		.link-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
