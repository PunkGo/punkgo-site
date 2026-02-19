<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import { DIVIDER_DOUBLE } from '$lib/assets/ascii-art';
</script>

<footer class="footer">
	<pre class="divider">{DIVIDER_DOUBLE}</pre>
	<div class="footer-content">
		<span class="meta">{t('footer.license')} | v0.1.0 | 2026</span>
		<span class="built">{t('footer.built')}</span>
		<a href="#hero" class="top-link">[^ TOP]</a>
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

	.meta {
		font-family: var(--font-pixel);
		font-size: 8px;
		color: var(--text-dim);
		letter-spacing: 1px;
	}

	.built {
		font-family: var(--font-terminal);
		font-size: 1rem;
		color: var(--text-dim);
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
</style>
