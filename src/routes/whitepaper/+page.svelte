<script lang="ts">
	import { t, getLocale } from '$lib/i18n/index.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';

	let locale = $derived(getLocale());
</script>

<svelte:head>
	<title>PunkGo — {t('whitepaper.page_title')}</title>
</svelte:head>

<section class="whitepaper">
	<pre class="divider">{DIVIDER}</pre>

	<h1 class="section-title">{t('whitepaper.title')}</h1>

	<blockquote class="epigraph">{t('whitepaper.epigraph')}</blockquote>

	<p class="intro">{t('whitepaper.intro')}</p>

	<!-- §1 -->
	<h2 class="wp-heading">{t('whitepaper.s1_title')}</h2>
	<p class="wp-body"><strong>{t('whitepaper.s1_term')}</strong>{t('whitepaper.s1_body')}</p>

	<!-- §2 -->
	<h2 class="wp-heading">{t('whitepaper.s2_title')}</h2>
	<p class="wp-body">{t('whitepaper.s2_intro')}</p>

	<div class="primitives">
		<div class="primitive">
			<span class="prim-label">P</span>
			<span class="prim-name">{t('whitepaper.s2_p_name')}</span>
			<span class="prim-desc">{t('whitepaper.s2_p_desc')}</span>
		</div>
		<div class="primitive">
			<span class="prim-label">E</span>
			<span class="prim-name">{t('whitepaper.s2_e_name')}</span>
			<span class="prim-desc">{t('whitepaper.s2_e_desc')}</span>
		</div>
		<div class="primitive">
			<span class="prim-label">S</span>
			<span class="prim-name">{t('whitepaper.s2_s_name')}</span>
			<span class="prim-desc">{t('whitepaper.s2_s_desc')}</span>
		</div>
	</div>

	<p class="wp-body">{t('whitepaper.s2_advance')}</p>

	<pre class="formula">S' = f(S, A, E)
E' = E - cost(A)</pre>

	<p class="wp-body">{t('whitepaper.s2_actions')}</p>
	<p class="wp-body">{t('whitepaper.s2_committer')}</p>

	<!-- §3 -->
	<h2 class="wp-heading">{t('whitepaper.s3_title')}</h2>

	<ol class="invariants-list">
		{#each t('whitepaper.s3_items') as item, i}
			<li>
				<span class="inv-num">{String(i + 1).padStart(2, '0')}</span>
				<strong>{item.title}</strong>
				<span class="inv-sep">—</span>
				{item.desc}
			</li>
		{/each}
	</ol>
</section>

<style>
	.whitepaper {
		padding: var(--space-lg) var(--space-lg);
		max-width: 800px;
		margin: 0 auto;
		min-height: 100vh;
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
		font-size: clamp(14px, 2.5vw, 20px);
		color: var(--neon-green);
		margin-bottom: var(--space-md);
		text-shadow: 0 0 10px var(--pixel-shadow);
	}

	.epigraph {
		font-family: var(--font-terminal);
		font-size: 1.3rem;
		color: var(--neon-pink);
		border-left: 3px solid var(--neon-purple);
		padding-left: var(--space-sm);
		margin-bottom: var(--space-lg);
		line-height: 1.6;
		font-style: italic;
	}

	.intro {
		font-family: var(--font-terminal);
		font-size: 1.15rem;
		color: var(--text-primary);
		line-height: 1.8;
		margin-bottom: var(--space-lg);
	}

	.wp-heading {
		font-family: var(--font-pixel);
		font-size: clamp(10px, 2vw, 14px);
		color: var(--neon-blue);
		letter-spacing: 2px;
		margin-top: var(--space-lg);
		margin-bottom: var(--space-md);
		text-shadow: 0 0 6px rgba(0, 212, 255, 0.3);
	}

	.wp-body {
		font-family: var(--font-terminal);
		font-size: 1.1rem;
		color: var(--text-primary);
		line-height: 1.8;
		margin-bottom: var(--space-sm);
	}

	.wp-body strong {
		color: var(--neon-yellow);
	}

	.primitives {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: var(--space-md) 0;
		padding-left: var(--space-sm);
		border-left: 2px solid var(--neon-purple);
	}

	.primitive {
		display: flex;
		align-items: baseline;
		gap: 10px;
		flex-wrap: wrap;
	}

	.prim-label {
		font-family: var(--font-pixel);
		font-size: 12px;
		color: var(--neon-green);
		min-width: 20px;
		text-shadow: 0 0 6px var(--pixel-shadow);
	}

	.prim-name {
		font-family: var(--font-pixel);
		font-size: 9px;
		color: var(--neon-yellow);
		letter-spacing: 1px;
	}

	.prim-desc {
		font-family: var(--font-terminal);
		font-size: 1rem;
		color: var(--text-dim);
	}

	.formula {
		font-family: var(--font-terminal);
		font-size: 1.2rem;
		color: var(--neon-green);
		text-shadow: 0 0 6px var(--pixel-shadow);
		background: var(--bg-secondary);
		padding: var(--space-sm) var(--space-md);
		margin: var(--space-md) 0;
		border-left: 3px solid var(--neon-green);
		line-height: 1.8;
		overflow-x: auto;
	}

	.invariants-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: var(--space-md);
	}

	.invariants-list li {
		font-family: var(--font-terminal);
		font-size: 1.1rem;
		color: var(--text-primary);
		line-height: 1.6;
		padding-left: var(--space-sm);
		border-left: 2px solid var(--neon-purple);
	}

	.invariants-list li strong {
		color: var(--neon-yellow);
	}

	.inv-num {
		font-family: var(--font-pixel);
		font-size: 9px;
		color: var(--neon-purple);
		margin-right: 8px;
	}

	.inv-sep {
		color: var(--text-dim);
		margin: 0 4px;
	}

	@media (max-width: 768px) {
		.whitepaper {
			padding: var(--space-md) var(--space-sm);
			padding-top: 70px;
		}

		.epigraph {
			font-size: 1.1rem;
		}

		.formula {
			font-size: 1rem;
		}
	}
</style>
