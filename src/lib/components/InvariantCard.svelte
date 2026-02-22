<script lang="ts">
	let {
		number,
		title,
		desc
	}: {
		number: number;
		title: string;
		desc: string;
	} = $props();
</script>

<div class="nes-container card">
	<span class="nes-text is-error number">{String(number).padStart(2, '0')}</span>
	<h3 class="title">{title}</h3>
	<p class="desc">{desc}</p>
</div>

<style>
	.nes-container.card {
		padding: var(--space-sm);
		background: var(--bg-secondary);
		color: var(--text-dim);
		transition: color 0.2s, border-color 0.2s;
		height: 100%;
	}
	.nes-container.card:hover {
		color: var(--neon-green);
		border-color: var(--neon-green) !important;
	}

	.nes-text.number {
		font-family: var(--font-pixel);
		font-size: 24px;
		display: block;
		margin-bottom: 8px;
	}

	.title {
		font-family: var(--font-pixel);
		font-size: 10px;
		color: var(--neon-green);
		margin-bottom: 8px;
		line-height: 1.4;
	}

	.desc {
		font-family: var(--font-terminal);
		font-size: 1rem;
		color: var(--text-primary);
		line-height: 1.4;
	}
</style>
