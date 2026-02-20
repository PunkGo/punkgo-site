<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import TerminalBlock from './TerminalBlock.svelte';

	let {
		name,
		classLabel,
		status,
		desc,
		flowArt,
		stats,
		commands,
		github
	}: {
		name: string;
		classLabel: string;
		status: string;
		desc: string;
		flowArt: string;
		stats: { label: string; level: number }[];
		commands: string;
		github: string;
	} = $props();

	let face = $state<'front' | 'back'>('front');
	let transitioning = $state(false);

	function flip(to: 'front' | 'back') {
		if (transitioning) return;
		transitioning = true;
		// After the wipe covers the card, switch face
		setTimeout(() => {
			face = to;
		}, 300);
		// After the wipe reveals the new face, done
		setTimeout(() => {
			transitioning = false;
		}, 600);
	}
</script>

<div class="card" class:transitioning>
	<!-- Scanline wipe overlay -->
	{#if transitioning}
		<div class="wipe-overlay">
			{#each Array(8) as _, i}
				<div class="wipe-line" style="animation-delay: {i * 25}ms"></div>
			{/each}
		</div>
	{/if}

	{#if face === 'front'}
		<!-- Front face -->
		<div class="nes-container card-face">
			<div class="card-header">
				<div class="card-name-row">
					<h3 class="card-name">{name}</h3>
					<span class="nes-badge card-status">
						<span class="is-success">{status}</span>
					</span>
				</div>
				<span class="card-class">{classLabel}</span>
			</div>

			<div class="card-divider">{'═'.repeat(40)}</div>

			<p class="card-desc">{desc}</p>

			<div class="card-flow">
				<h4 class="flow-title">{t('showcase.watchdog.flow_title')}</h4>
				<pre class="flow-art">{flowArt}</pre>
			</div>

			<div class="card-stats">
				{#each stats as stat, i}
					<div class="stat-row">
						<span class="stat-label">{stat.label}</span>
						<progress
							class="nes-progress {['is-success','is-primary','is-warning','is-error'][i]}"
							value={stat.level}
							max="100"
						></progress>
					</div>
				{/each}
			</div>

			<button class="nes-btn flip-btn" onclick={() => flip('back')}>
				[ {t('showcase.watchdog.cmd_title')} &gt; ]
			</button>
		</div>
	{:else}
		<!-- Back face -->
		<div class="nes-container card-face">
			<div class="card-header">
				<h3 class="card-name">{name}</h3>
				<span class="card-class">{t('showcase.watchdog.cmd_title')}</span>
			</div>

			<div class="card-divider">{'═'.repeat(40)}</div>

			<div class="cmd-area">
				<TerminalBlock title="watchdog" code={commands} />
			</div>

			<div class="card-actions">
				<a href={github} target="_blank" rel="noopener noreferrer" class="nes-btn is-success github-btn">
					<i class="nes-icon github is-small"></i>
					<span class="btn-text">{t('showcase.watchdog.github')}</span>
				</a>
				<button class="nes-btn flip-btn" onclick={() => flip('front')}>
					[ &lt; BACK ]
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.card {
		width: 100%;
		max-width: 600px;
		position: relative;
		overflow: hidden;
	}

	/* Scanline wipe overlay */
	.wipe-overlay {
		position: absolute;
		inset: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		pointer-events: none;
		overflow: hidden;
	}

	.wipe-line {
		flex: 1;
		background: var(--neon-purple);
		animation: wipe-across 0.6s ease-in-out forwards;
		box-shadow: 0 0 8px rgba(184, 41, 221, 0.6);
	}

	@keyframes wipe-across {
		0%   { transform: translateX(-100%); }
		40%  { transform: translateX(0); }
		60%  { transform: translateX(0); }
		100% { transform: translateX(100%); }
	}

	/* NES container 颜色覆盖为紫色（赛博朋克配色） */
	.card-face.nes-container {
		color: var(--neon-purple);
		background: var(--bg-secondary);
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20px rgba(184, 41, 221, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		padding: var(--space-md);
		border-color: var(--neon-purple) !important;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-xs);
	}

	.card-name-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.card-name {
		font-family: var(--font-pixel);
		font-size: 14px;
		color: var(--neon-pink);
		text-shadow: 0 0 8px rgba(255, 45, 149, 0.4);
		letter-spacing: 2px;
	}

	.card-status {
		animation: status-pulse 2s ease-in-out infinite;
	}
	.card-status span {
		font-family: var(--font-pixel);
		font-size: 7px;
		letter-spacing: 1px;
	}

	@keyframes status-pulse {
		0%, 100% { filter: brightness(1); }
		50% { filter: brightness(1.3) drop-shadow(0 0 4px var(--neon-green)); }
	}

	.card-class {
		font-family: var(--font-pixel);
		font-size: 8px;
		color: var(--neon-yellow);
		letter-spacing: 2px;
		text-transform: uppercase;
	}

	.card-divider {
		font-family: var(--font-terminal);
		color: var(--neon-purple);
		font-size: 0.7rem;
		opacity: 0.4;
		overflow: hidden;
		margin-bottom: var(--space-sm);
		user-select: none;
	}

	.card-desc {
		font-family: var(--font-terminal);
		font-size: 1.1rem;
		color: var(--text-primary);
		line-height: 1.6;
		margin-bottom: var(--space-md);
	}

	.card-flow {
		margin-bottom: var(--space-md);
	}

	.flow-title {
		font-family: var(--font-pixel);
		font-size: 8px;
		color: var(--neon-blue);
		letter-spacing: 2px;
		margin-bottom: var(--space-xs);
	}

	.flow-art {
		font-family: var(--font-terminal);
		font-size: 1rem;
		color: var(--neon-green);
		line-height: 1.4;
		text-shadow: 0 0 4px var(--pixel-shadow);
		overflow-x: auto;
		user-select: none;
	}

	.card-stats {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: var(--space-md);
	}

	.stat-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.stat-label {
		font-family: var(--font-pixel);
		font-size: 7px;
		color: var(--text-dim);
		min-width: 120px;
		letter-spacing: 1px;
		text-transform: uppercase;
		flex-shrink: 0;
	}

	/* NES progress — 像素跳格动画，比 ease-out 更 8bit */
	.stat-row progress.nes-progress {
		flex: 1;
		height: 16px;
		transition: width 0.8s steps(12);
	}

	.flip-btn.nes-btn {
		margin-top: auto;
		align-self: flex-end;
		color: var(--neon-purple);
		font-size: 8px;
		padding: 6px 16px;
		border-color: var(--neon-purple) !important;
	}
	.flip-btn.nes-btn:hover:not([disabled]) {
		background-color: var(--neon-purple) !important;
		color: var(--bg-primary) !important;
	}

	.cmd-area {
		flex: 1;
		margin-bottom: var(--space-sm);
	}

	.card-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto;
		gap: var(--space-sm);
	}

	.github-btn.nes-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		text-decoration: none;
	}

	.btn-text {
		font-family: var(--font-pixel);
		font-size: 8px;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	@media (max-width: 600px) {
		.card-face.nes-container {
			padding: var(--space-xs);
		}

		.card-header {
			flex-direction: column;
			gap: 4px;
		}

		.card-name {
			font-size: 11px;
		}

		.card-desc {
			font-size: 1rem;
			margin-bottom: var(--space-sm);
		}

		.flow-art {
			font-size: 0.7rem;
		}

		.card-flow {
			margin-bottom: var(--space-sm);
		}

		.stat-label {
			min-width: 70px;
			font-size: 6px;
		}

		.stat-row {
			gap: 8px;
		}

		.card-divider {
			font-size: 0.5rem;
		}

		.card-actions {
			flex-direction: column;
			gap: 8px;
			align-items: stretch;
		}

		.github-btn.nes-btn {
			justify-content: center;
		}

		.flip-btn.nes-btn {
			align-self: center;
		}
	}
</style>
