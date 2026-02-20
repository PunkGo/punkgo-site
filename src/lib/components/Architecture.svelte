<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import PipelineViz from './PipelineViz.svelte';
	import InvariantCard from './InvariantCard.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<div class="architecture">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('architecture.title')}</h2>

	<h3 class="sub-title">{t('architecture.pipeline_title')}</h3>
	<PipelineViz />

	<h3 class="sub-title invariants-heading">{t('architecture.invariants_title')}</h3>
	<div class="invariants-grid">
		{#each t('architecture.invariants') as inv, i}
			<InvariantCard number={i + 1} title={inv.title} desc={inv.desc} />
		{/each}
	</div>
</div>

<style>
	.architecture {
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

	.sub-title {
		font-family: var(--font-pixel);
		font-size: 11px;
		color: var(--neon-blue);
		margin-bottom: var(--space-md);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.invariants-heading {
		margin-top: var(--space-xl);
	}

	.invariants-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-sm);
	}


	@media (max-width: 1024px) {
		.invariants-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 600px) {
		.invariants-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
