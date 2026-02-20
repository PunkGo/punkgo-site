<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<svelte:head>
	<title>PunkGo Lab — Built with PunkGo</title>
</svelte:head>

<section class="showcase">
	<a href="/" class="back-link">{t('showcase.back')}</a>

	<pre class="divider">{DIVIDER}</pre>

	<h1 class="section-title">{t('showcase.title')}</h1>
	<p class="section-subtitle">{t('showcase.subtitle')}</p>

	<div class="projects-grid">
		<ProjectCard
			name={t('showcase.watchdog.name')}
			classLabel={t('showcase.watchdog.class')}
			status={t('showcase.watchdog.status')}
			desc={t('showcase.watchdog.desc')}
			flowArt={`  File Change ──▶ Watchdog ──▶ Kernel
       │              │           │
    [SHA-256]     [debounce]  [7-step pipeline]
       │              │           │
       ▼              ▼           ▼
    content     IPC submit    append-only log
     hash        (mutate)    + Merkle proof`}
			stats={[
				{ label: t('showcase.watchdog.stat_log'), level: 95 },
				{ label: t('showcase.watchdog.stat_merkle'), level: 85 },
				{ label: t('showcase.watchdog.stat_energy'), level: 60 },
				{ label: t('showcase.watchdog.stat_ipc'), level: 75 }
			]}
			commands={`# Watch a directory
punkgo-watchdog watch .

# View file change history
punkgo-watchdog history --limit 20

# Verify file integrity
punkgo-watchdog verify src/main.rs

# Check actor energy & status
punkgo-watchdog status

# Export provenance package
punkgo-watchdog export --output proof.json`}
			github="https://github.com/PunkGo/punkgo-watchdog"
		/>
	</div>
</section>

<style>
	.showcase {
		padding: var(--space-xl) var(--space-lg);
		max-width: 1200px;
		margin: 0 auto;
		min-height: 100vh;
	}

	.back-link {
		display: inline-block;
		font-family: var(--font-pixel);
		font-size: 10px;
		color: var(--text-dim);
		text-decoration: none;
		letter-spacing: 2px;
		margin-bottom: var(--space-md);
		transition: color 0.15s;
	}

	.back-link:hover {
		color: var(--neon-green);
		text-shadow: 0 0 8px var(--pixel-shadow);
	}

	.divider {
		font-family: monospace;
		color: var(--text-dim);
		text-align: center;
		font-size: 0.8rem;
		margin-bottom: var(--space-lg);
		opacity: 0.4;
		overflow: hidden;
	}

	.section-title {
		font-family: var(--font-pixel);
		font-size: clamp(14px, 2.5vw, 20px);
		color: var(--neon-green);
		margin-bottom: var(--space-sm);
		text-shadow: 0 0 10px var(--pixel-shadow);
	}

	.section-subtitle {
		font-family: var(--font-terminal);
		font-size: 1.2rem;
		color: var(--text-dim);
		margin-bottom: var(--space-xl);
		line-height: 1.5;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 600px));
		gap: var(--space-lg);
		justify-content: center;
	}

	@media (max-width: 768px) {
		.showcase {
			padding: var(--space-lg) var(--space-sm);
			padding-top: 80px;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
