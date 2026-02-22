<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import GlitchText from './GlitchText.svelte';
	import AsciiLogo from './AsciiLogo.svelte';
	import { ARROW_DOWN } from '$lib/assets/ascii-art';
</script>

<div class="hero">
	<div class="hero-content">
		<AsciiLogo />

		<h1 class="question">
			<GlitchText text={t('hero.question')} typingSpeed={60} />
		</h1>

		<p class="subtitle">{t('hero.subtitle')}</p>
		<p class="tagline">{t('hero.tagline')}</p>
	</div>

	<a href="#philosophy" class="scroll-hint" aria-label={t('hero.scroll')}>
		<pre class="arrow">{ARROW_DOWN}</pre>
		<span class="scroll-text">{t('hero.scroll')}</span>
	</a>
</div>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--space-lg);
		position: relative;
		background:
			radial-gradient(ellipse at 50% 50%, rgba(57, 255, 20, 0.03) 0%, transparent 70%),
			var(--bg-primary);
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
	}

	.question {
		font-family: var(--font-pixel);
		font-size: min(2.2vw, 1.6rem);
		color: var(--neon-pink);
		line-height: 1.8;
		text-shadow: 0 0 20px rgba(255, 45, 149, 0.3);
		white-space: pre-line;
	}

	.subtitle {
		font-family: var(--font-pixel);
		font-size: clamp(8px, 1.5vw, 12px);
		color: var(--neon-blue);
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	.tagline {
		font-family: var(--font-terminal);
		font-size: 1.2rem;
		color: var(--text-dim);
	}

	.scroll-hint {
		position: absolute;
		bottom: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		animation: float 2s infinite ease-in-out;
		text-decoration: none;
	}

	.arrow {
		font-family: monospace;
		color: var(--neon-green);
		font-size: 0.7rem;
		line-height: 1;
		text-shadow: 0 0 8px var(--pixel-shadow);
	}

	.scroll-text {
		font-family: var(--font-pixel);
		font-size: 8px;
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	@media (max-width: 768px) {
		.hero {
			padding: var(--space-sm);
		}
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-8px); }
	}
</style>
