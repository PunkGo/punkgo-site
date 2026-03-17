<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<div class="why">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('why.title')}</h2>

	<p class="story">{t('why.story')}</p>
	<p class="punchline">{t('why.punchline')}</p>
	<p class="audience">{t('why.audience')}</p>
</div>

<style>
	.why {
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

	.story {
		font-family: var(--font-readable);
		font-size: 1.2rem;
		color: var(--text-primary);
		line-height: 1.8;
		max-width: 800px;
		margin-bottom: var(--space-md);
	}

	.punchline {
		font-family: var(--font-readable);
		font-size: 1.3rem;
		color: var(--neon-yellow);
		line-height: 1.8;
		max-width: 800px;
		margin-bottom: var(--space-md);
	}

	.audience {
		font-family: var(--font-readable);
		font-size: 1.1rem;
		color: var(--text-dim);
		line-height: 1.6;
		max-width: 800px;
		font-style: italic;
	}
</style>
