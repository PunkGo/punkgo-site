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

<div class="card">
	<span class="number">{String(number).padStart(2, '0')}</span>
	<h3 class="title">{title}</h3>
	<p class="desc">{desc}</p>
</div>

<style>
	.card {
		border: 2px solid var(--text-dim);
		padding: var(--space-sm);
		background: var(--bg-secondary);
		transition: all 0.2s;
	}
	.card:hover {
		border-color: var(--neon-green);
		box-shadow: 0 0 15px var(--pixel-shadow);
		transform: translateY(-2px);
	}

	.number {
		font-family: var(--font-pixel);
		font-size: 24px;
		color: var(--neon-pink);
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
