<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<div class="tools">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('tools.title')}</h2>

	<div class="tool-list">
		<div class="nes-container tool-item active">
			<span class="tool-status">ACTIVE</span>
			<span class="tool-name">{t('tools.claude_code')}</span>
		</div>
		<div class="nes-container tool-item active">
			<span class="tool-status">ACTIVE</span>
			<span class="tool-name">{t('tools.cursor')}</span>
		</div>
		<div class="nes-container tool-item active">
			<span class="tool-status">BUILT-IN</span>
			<span class="tool-name">{t('tools.mcp')}</span>
		</div>
		<div class="nes-container tool-item planned">
			<span class="tool-status">PLANNED</span>
			<span class="tool-name">{t('tools.planned')}</span>
		</div>
	</div>
</div>

<style>
	.tools {
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

	.tool-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		max-width: 700px;
	}

	.nes-container.tool-item {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: 12px var(--space-md);
		background: var(--bg-secondary);
	}

	.tool-status {
		font-family: var(--font-pixel);
		font-size: 8px;
		letter-spacing: 1px;
		min-width: 70px;
	}

	.tool-item.active .tool-status {
		color: var(--neon-green);
	}

	.tool-item.planned .tool-status {
		color: var(--text-dim);
	}

	.tool-name {
		font-family: var(--font-readable);
		font-size: 1rem;
		color: var(--text-primary);
	}

	@media (max-width: 768px) {
		.nes-container.tool-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}
	}
</style>
