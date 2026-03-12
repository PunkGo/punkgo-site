<script lang="ts">
	import { t, getLocale } from '$lib/i18n/index.svelte';
	import TerminalBlock from './TerminalBlock.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';

	const installCode = `# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/PunkGo/punkgo-jack/main/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/PunkGo/punkgo-jack/main/install.ps1 | iex

# or with cargo
cargo install punkgo-jack && cargo install punkgo-kernel`;

	const setupCode = `# Hook into Claude Code (one command, fully automatic)
punkgo-jack setup claude-code

# That's it. Your next Claude Code session is already being recorded.`;

	const queryCode = `# See what your AI agent did
punkgo-jack history

# Verify a specific action's Merkle proof
punkgo-jack show <event_id>

# Session receipt with cryptographic proof
punkgo-jack receipt

# Activity heatmap
punkgo-jack presence`;
</script>

<div class="quickstart">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('quickstart.title')}</h2>

	<TerminalBlock title={getLocale() === 'zh' ? '安装' : 'Install'} code={installCode} />
	<TerminalBlock title={getLocale() === 'zh' ? '接入 Claude Code' : 'Hook into Claude Code'} code={setupCode} />
	<TerminalBlock title={getLocale() === 'zh' ? '查询与验证' : 'Query & Verify'} code={queryCode} />
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
