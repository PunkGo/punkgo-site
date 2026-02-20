<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<div class="showcase-entry">
	<pre class="divider">{DIVIDER}</pre>

	<a href="/showcase/" class="portal">
		<div class="portal-frame">
			<div class="gate">
				<div class="gate-border">
					<div class="gate-static">
						<div class="gate-inner">
							<div class="gate-screen">
								<span class="gate-label">LAB</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="portal-glow"></div>
		</div>

		<div class="portal-text">
			<h3 class="portal-title">{t('showcase_entry.title')}</h3>
			<p class="portal-subtitle">{t('showcase_entry.subtitle')}</p>
			<span class="portal-hint">{t('showcase_entry.hint')}</span>
		</div>
	</a>
</div>

<style>
	.showcase-entry {
		padding: var(--space-sm) 0;
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

	.portal {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-lg);
		text-decoration: none;
		padding: var(--space-md);
		border: 2px solid transparent;
		transition: all 0.3s;
		cursor: pointer;
	}

	.portal:hover {
		border-color: var(--neon-purple);
		background: rgba(184, 41, 221, 0.05);
	}

	.portal-frame {
		position: relative;
		flex-shrink: 0;
	}

	.gate {
		width: 200px;
		height: 220px;
		position: relative;
		transition: all 0.3s;
		user-select: none;
	}

	.gate-border {
		position: absolute;
		inset: 0;
		border: 3px solid var(--neon-purple);
		box-shadow: 0 0 8px rgba(184, 41, 221, 0.4), inset 0 0 8px rgba(184, 41, 221, 0.1);
		transition: all 0.3s;
	}

	.gate-static {
		position: absolute;
		inset: 10px;
		background:
			repeating-linear-gradient(
				45deg,
				transparent,
				transparent 3px,
				rgba(184, 41, 221, 0.12) 3px,
				rgba(184, 41, 221, 0.12) 6px
			);
		border: 2px solid rgba(184, 41, 221, 0.3);
		transition: all 0.3s;
	}

	.gate-inner {
		position: absolute;
		inset: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gate-screen {
		width: 100px;
		height: 70px;
		border: 2px solid var(--neon-purple);
		background: rgba(184, 41, 221, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 12px rgba(184, 41, 221, 0.2), inset 0 0 20px rgba(184, 41, 221, 0.05);
		transition: all 0.3s;
	}

	.gate-label {
		font-family: var(--font-pixel);
		font-size: 16px;
		color: var(--neon-purple);
		letter-spacing: 4px;
		text-shadow: 0 0 10px rgba(184, 41, 221, 0.6);
		transition: all 0.3s;
	}

	.portal:hover .gate-border {
		border-color: var(--neon-pink);
		box-shadow: 0 0 16px rgba(255, 45, 149, 0.5), inset 0 0 12px rgba(255, 45, 149, 0.1);
	}

	.portal:hover .gate-static {
		background:
			repeating-linear-gradient(
				45deg,
				transparent,
				transparent 3px,
				rgba(255, 45, 149, 0.15) 3px,
				rgba(255, 45, 149, 0.15) 6px
			);
		border-color: rgba(255, 45, 149, 0.4);
	}

	.portal:hover .gate-screen {
		border-color: var(--neon-pink);
		background: rgba(255, 45, 149, 0.1);
		box-shadow: 0 0 20px rgba(255, 45, 149, 0.3), inset 0 0 24px rgba(255, 45, 149, 0.08);
	}

	.portal:hover .gate-label {
		color: var(--neon-pink);
		text-shadow: 0 0 14px rgba(255, 45, 149, 0.7);
	}

	.portal-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 120px;
		height: 120px;
		background: radial-gradient(circle, rgba(184, 41, 221, 0.15) 0%, transparent 70%);
		border-radius: 50%;
		animation: pulse-glow 2s ease-in-out infinite;
		pointer-events: none;
	}

	.portal:hover .portal-glow {
		background: radial-gradient(circle, rgba(255, 45, 149, 0.25) 0%, transparent 70%);
		width: 160px;
		height: 160px;
	}

	.portal-text {
		text-align: left;
	}

	.portal-title {
		font-family: var(--font-pixel);
		font-size: clamp(14px, 2.5vw, 20px);
		color: var(--neon-purple);
		margin-bottom: var(--space-sm);
		text-shadow: 0 0 10px rgba(184, 41, 221, 0.4);
		letter-spacing: 2px;
		transition: color 0.3s;
	}

	.portal:hover .portal-title {
		color: var(--neon-pink);
		text-shadow: 0 0 14px rgba(255, 45, 149, 0.5);
	}

	.portal-subtitle {
		font-family: var(--font-terminal);
		font-size: 1.2rem;
		color: var(--text-primary);
		margin-bottom: var(--space-md);
		line-height: 1.5;
	}

	.portal-hint {
		font-family: var(--font-pixel);
		font-size: 10px;
		color: var(--neon-green);
		letter-spacing: 2px;
		animation: blink-hint 1.2s step-end infinite;
	}

	@keyframes pulse-glow {
		0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
		50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
	}

	@keyframes blink-hint {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 768px) {
		.portal {
			flex-direction: column;
			gap: var(--space-md);
			text-align: center;
		}

		.portal-text {
			text-align: center;
		}

		.gate {
			width: 160px;
			height: 180px;
		}

		.gate-screen {
			width: 80px;
			height: 56px;
		}

		.gate-label {
			font-size: 12px;
		}
	}
</style>
