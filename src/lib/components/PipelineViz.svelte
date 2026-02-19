<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';

	const stepKeys = ['validate', 'quote', 'reserve', 'execute', 'settle', 'append', 'receipt'];

	let visible = $state(false);
	let activeStep = $state(-1);
	let container: HTMLElement;

	$effect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !visible) {
					visible = true;
					animateSteps();
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(container);
		return () => observer.disconnect();
	});

	function animateSteps() {
		let i = 0;
		const interval = setInterval(() => {
			activeStep = i;
			i++;
			if (i >= stepKeys.length) clearInterval(interval);
		}, 200);
	}
</script>

<div class="pipeline" bind:this={container}>
	{#each stepKeys as key, i}
		{#if i > 0}
			<span class="arrow" class:lit={visible && activeStep >= i}>{'>>>'}</span>
		{/if}
		<div
			class="step"
			class:lit={visible && activeStep >= i}
		>
			<span class="step-name">{t(`architecture.steps.${key}`)}</span>
			<span class="step-desc">{t(`architecture.steps.${key}_desc`)}</span>
		</div>
	{/each}
</div>

<style>
	.pipeline {
		display: flex;
		align-items: flex-start;
		gap: 4px;
		overflow-x: auto;
		padding: var(--space-sm) 0;
		scrollbar-width: thin;
		scrollbar-color: var(--neon-green) var(--bg-primary);
	}

	.step {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 110px;
		padding: 12px 8px;
		border: 2px solid var(--text-dim);
		background: var(--bg-secondary);
		opacity: 0.3;
		transition: all 0.3s;
	}

	.step.lit {
		border-color: var(--neon-green);
		opacity: 1;
		box-shadow: 0 0 10px var(--pixel-shadow);
	}

	.step-name {
		font-family: var(--font-pixel);
		font-size: 9px;
		color: var(--neon-green);
		text-transform: uppercase;
		margin-bottom: 6px;
		text-align: center;
	}

	.step-desc {
		font-family: var(--font-terminal);
		font-size: 0.85rem;
		color: var(--text-dim);
		text-align: center;
		line-height: 1.3;
	}
	.step.lit .step-desc {
		color: var(--text-primary);
	}

	.arrow {
		font-family: var(--font-terminal);
		font-size: 1.2rem;
		color: var(--text-dim);
		align-self: center;
		opacity: 0.3;
		transition: all 0.3s;
		flex-shrink: 0;
	}
	.arrow.lit {
		color: var(--neon-green);
		opacity: 1;
		text-shadow: 0 0 8px var(--pixel-shadow);
	}

	@media (max-width: 768px) {
		.pipeline {
			flex-direction: column;
			align-items: stretch;
		}
		.arrow {
			transform: rotate(90deg);
			align-self: center;
		}
		.step {
			min-width: unset;
		}
	}
</style>
