<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<div class="trust">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('trust.title')}</h2>
	<p class="subtitle">{t('trust.subtitle')}</p>

	<div class="layers-grid">
		<div class="nes-container layer-card layer-1">
			<div class="layer-number">01</div>
			<h3>{t('trust.merkle_title')}</h3>
			<p>{t('trust.merkle_desc')}</p>
		</div>
		<div class="nes-container layer-card layer-2">
			<div class="layer-number">02</div>
			<h3>{t('trust.ed25519_title')}</h3>
			<p>{t('trust.ed25519_desc')}</p>
		</div>
		<div class="nes-container layer-card layer-3">
			<div class="layer-number">03</div>
			<h3>{t('trust.tsa_title')}</h3>
			<p>{t('trust.tsa_desc')}</p>
		</div>
	</div>
</div>

<style>
	.trust {
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
		margin-bottom: var(--space-xs);
		text-shadow: 0 0 10px var(--pixel-shadow);
	}

	.subtitle {
		font-family: var(--font-readable);
		font-size: 1.1rem;
		color: var(--text-dim);
		margin-bottom: var(--space-lg);
	}

	.layers-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-md);
	}

	.nes-container.layer-card {
		padding: var(--space-md);
		background: var(--bg-secondary);
		color: var(--text-dim);
		transition: color 0.2s, border-color 0.2s;
	}

	.layer-number {
		font-family: var(--font-pixel);
		font-size: 24px;
		margin-bottom: var(--space-xs);
		opacity: 0.3;
	}

	.layer-1 .layer-number { color: var(--neon-blue); }
	.layer-2 .layer-number { color: var(--neon-green); }
	.layer-3 .layer-number { color: var(--neon-yellow); }

	.nes-container.layer-card:hover {
		color: var(--neon-blue);
		border-color: var(--neon-blue) !important;
	}

	.nes-container.layer-card h3 {
		font-family: var(--font-pixel);
		font-size: 10px;
		color: var(--neon-green);
		margin-bottom: 8px;
	}

	.nes-container.layer-card p {
		font-family: var(--font-readable);
		font-size: 1rem;
		color: var(--text-primary);
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.layers-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
