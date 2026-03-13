<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import { DIVIDER_DOUBLE } from '$lib/assets/ascii-art';
</script>

<footer class="footer">
	<pre class="divider">{DIVIDER_DOUBLE}</pre>
	<div class="footer-content">
		<div class="footer-left">
			<span class="built">{t('footer.built')}</span>
		</div>
		<div class="footer-links">
			<a href="https://github.com/PunkGo" target="_blank" rel="noopener noreferrer">GitHub</a>
			<a href="https://crates.io/crates/punkgo-jack" target="_blank" rel="noopener noreferrer">crates.io</a>
			<a href="mailto:feijiu@punkgo.ai">feijiu@punkgo.ai</a>
		</div>
		<a href="#top" class="top-link" onclick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>[^ TOP]</a>
	</div>
</footer>

<style>
	.footer {
		padding: var(--space-lg) var(--space-lg) var(--space-md);
		max-width: 1200px;
		margin: 0 auto;
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

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.meta {
		font-family: var(--font-pixel);
		font-size: 8px;
		color: var(--text-dim);
		letter-spacing: 1px;
	}

	.built {
		font-family: var(--font-readable);
		font-size: 1rem;
		color: var(--text-dim);
	}

	.footer-links {
		display: flex;
		gap: 20px;
		font-family: var(--font-readable);
		font-size: 1rem;
	}

	.footer-links a {
		color: var(--text-dim);
	}
	.footer-links a:hover {
		color: var(--neon-green);
		text-shadow: 0 0 6px var(--pixel-shadow);
	}

	.top-link {
		font-family: var(--font-pixel);
		font-size: 9px;
		color: var(--neon-green);
		text-decoration: none;
	}
	.top-link:hover {
		color: var(--neon-pink);
	}

	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
