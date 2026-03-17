<script lang="ts">
	import { t, getLocale } from '$lib/i18n/index.svelte';
	import TerminalBlock from './TerminalBlock.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';

	const installCode = `# Two commands. That's it.
curl -fsSL https://raw.githubusercontent.com/PunkGo/punkgo-jack/main/install.sh | bash
punkgo-jack setup claude-code   # or: punkgo-jack setup cursor`;

	const verifyCode = `# Session receipt with anchor timestamp
punkgo-jack receipt

# Cryptographic proof for any event
punkgo-jack verify <ID>

# Full event history
punkgo-jack history

# Activity heatmap across agents
punkgo-jack presence`;
</script>

<div class="quickstart">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('quickstart.title')}</h2>

	<TerminalBlock title={getLocale() === 'zh' ? '安装 + 接入' : 'Install + Hook'} code={installCode} />
	<TerminalBlock title={getLocale() === 'zh' ? '验证与查询' : 'Verify & Query'} code={verifyCode} />
</div>

<style>
	.quickstart {
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
</style>
