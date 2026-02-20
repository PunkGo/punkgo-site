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
		<div class="card-face">
			<div class="card-header">
				<div class="card-name-row">
					<h3 class="card-name">{name}</h3>
					<span class="card-status">{status}</span>
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
				{#each stats as stat}
					<div class="stat-row">
						<span class="stat-label">{stat.label}</span>
						<div class="stat-bar">
							<div class="stat-fill" style="width: {stat.level}%"></div>
						</div>
					</div>
				{/each}
			</div>

			<button class="flip-btn" onclick={() => flip('back')}>
				[ {t('showcase.watchdog.cmd_title')} &gt; ]
			</button>
		</div>
	{:else}
		<!-- Back face -->
		<div class="card-face">
			<div class="card-header">
				<h3 class="card-name">{name}</h3>
				<span class="card-class">{t('showcase.watchdog.cmd_title')}</span>
			</div>

			<div class="card-divider">{'═'.repeat(40)}</div>

			<div class="cmd-area">
				<TerminalBlock title="watchdog" code={commands} />
			</div>

			<div class="card-actions">
				<a href={github} target="_blank" rel="noopener noreferrer" class="github-btn">
					<span class="btn-icon">&gt;_</span>
					<span class="btn-text">{t('showcase.watchdog.github')}</span>
				</a>
				<button class="flip-btn" onclick={() => flip('front')}>
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
		transform: scaleX(0);
		transform-origin: left;
		animation: wipe-in 0.3s ease-in forwards, wipe-out 0.3s ease-out 0.3s forwards;
		box-shadow: 0 0 8px rgba(184, 41, 221, 0.6);
	}

	@keyframes wipe-in {
		0% { transform: scaleX(0); opacity: 1; }
		100% { transform: scaleX(1); opacity: 1; }
	}

	@keyframes wipe-out {
		0% { transform: scaleX(1); transform-origin: right; opacity: 1; }
		100% { transform: scaleX(0); transform-origin: right; opacity: 0; }
	}

	.card-face {
		border: 2px solid var(--neon-purple);
		background: var(--bg-secondary);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20px rgba(184, 41, 221, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.3);
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
		font-family: var(--font-pixel);
		font-size: 7px;
		color: var(--bg-primary);
		background: var(--neon-green);
		padding: 2px 8px;
		letter-spacing: 1px;
		animation: status-pulse 2s ease-in-out infinite;
	}

	@keyframes status-pulse {
		0%, 100% { box-shadow: 0 0 4px var(--pixel-shadow); }
		50% { box-shadow: 0 0 12px var(--neon-green); }
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
		gap: 8px;
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
	}

	.stat-bar {
		flex: 1;
		height: 12px;
		background: var(--bg-primary);
		border: 1px solid #333;
		overflow: hidden;
	}

	.stat-fill {
		height: 100%;
		transition: width 1s ease-out;
	}

	.stat-row:nth-child(1) .stat-fill { background: var(--neon-green); box-shadow: 0 0 6px var(--pixel-shadow); }
	.stat-row:nth-child(2) .stat-fill { background: var(--neon-blue); box-shadow: 0 0 6px rgba(0, 212, 255, 0.4); }
	.stat-row:nth-child(3) .stat-fill { background: var(--neon-yellow); box-shadow: 0 0 6px rgba(255, 230, 0, 0.4); }
	.stat-row:nth-child(4) .stat-fill { background: var(--neon-orange); box-shadow: 0 0 6px rgba(255, 107, 53, 0.4); }

	.flip-btn {
		margin-top: auto;
		align-self: flex-end;
		background: none;
		border: 1px solid var(--neon-purple);
		color: var(--neon-purple);
		font-family: var(--font-pixel);
		font-size: 8px;
		padding: 6px 16px;
		cursor: pointer;
		letter-spacing: 1px;
		transition: all 0.15s;
	}

	.flip-btn:hover {
		background: var(--neon-purple);
		color: var(--bg-primary);
		box-shadow: 0 0 10px rgba(184, 41, 221, 0.4);
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
	}

	.github-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 16px;
		border: 2px solid var(--neon-green);
		background: var(--bg-secondary);
		color: var(--neon-green);
		text-decoration: none;
		transition: all 0.15s;
		cursor: pointer;
	}

	.github-btn:hover {
		background: var(--neon-green);
		color: var(--bg-primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 0 0 rgba(57, 255, 20, 0.4);
	}

	.btn-icon {
		font-size: 1rem;
	}

	.btn-text {
		font-family: var(--font-pixel);
		font-size: 8px;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	@media (max-width: 600px) {
		.stat-label {
			min-width: 80px;
			font-size: 6px;
		}

		.card-name {
			font-size: 11px;
		}

		.flow-art {
			font-size: 0.8rem;
		}
	}
</style>
