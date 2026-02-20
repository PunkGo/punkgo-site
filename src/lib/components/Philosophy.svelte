<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<div class="philosophy">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('philosophy.title')}</h2>

	<p class="definition">{t('philosophy.definition')}</p>

	<div class="pes-grid">
		<div class="nes-container pes-card">
			<div class="pes-icon">&#9876;</div>
			<h3>{t('philosophy.p_title')}</h3>
			<p>{t('philosophy.p_desc')}</p>
		</div>
		<div class="nes-container pes-card">
			<div class="pes-icon">&#9889;</div>
			<h3>{t('philosophy.e_title')}</h3>
			<p>{t('philosophy.e_desc')}</p>
		</div>
		<div class="nes-container pes-card">
			<div class="pes-icon">&#9640;</div>
			<h3>{t('philosophy.s_title')}</h3>
			<p>{t('philosophy.s_desc')}</p>
		</div>
	</div>

	<div class="nes-container is-dark formula-block">
		<code>S' = f(S, A, E)&nbsp;&nbsp;&nbsp;where&nbsp;&nbsp;E' = E - cost(A)</code>
	</div>

	<p class="principle">{t('philosophy.formula')}</p>
	<p class="committer">{t('philosophy.committer')}</p>
</div>

<style>
	.philosophy {
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
		margin-bottom: var(--space-sm);
		text-shadow: 0 0 10px var(--pixel-shadow);
	}

	.definition {
		font-family: var(--font-terminal);
		font-size: 1.2rem;
		color: var(--text-primary);
		line-height: 1.8;
		max-width: 800px;
		margin-bottom: var(--space-lg);
	}

	.pes-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-md);
		margin-bottom: var(--space-lg);
	}

	.nes-container.pes-card {
		padding: var(--space-md);
		background: var(--bg-secondary);
		color: var(--text-dim);
		transition: color 0.2s, border-color 0.2s;
	}
	.nes-container.pes-card:hover {
		color: var(--neon-blue);
		border-color: var(--neon-blue) !important;
	}

	.pes-icon {
		font-size: 2rem;
		margin-bottom: var(--space-xs);
	}
	.nes-container.pes-card:nth-child(1) .pes-icon { color: var(--neon-pink); }
	.nes-container.pes-card:nth-child(2) .pes-icon { color: var(--neon-yellow); }
	.nes-container.pes-card:nth-child(3) .pes-icon { color: var(--neon-blue); }

	.nes-container.pes-card h3 {
		font-family: var(--font-pixel);
		font-size: 10px;
		color: var(--neon-green);
		margin-bottom: 8px;
	}

	.nes-container.pes-card p {
		font-family: var(--font-terminal);
		font-size: 1rem;
		color: var(--text-primary);
		line-height: 1.5;
	}

	.nes-container.is-dark.formula-block {
		padding: var(--space-sm) var(--space-md);
		margin-bottom: var(--space-md);
		display: inline-block;
		border-color: var(--neon-green) !important;
	}
	.nes-container.is-dark.formula-block code {
		font-family: var(--font-terminal);
		font-size: 1.3rem;
		color: var(--neon-green);
		text-shadow: 0 0 8px var(--pixel-shadow);
	}

	.principle {
		font-family: var(--font-terminal);
		font-size: 1.1rem;
		color: var(--neon-yellow);
		margin-bottom: var(--space-sm);
	}

	.committer {
		font-family: var(--font-terminal);
		font-size: 1rem;
		color: var(--text-dim);
		font-style: italic;
	}

	@media (max-width: 768px) {
		.pes-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
