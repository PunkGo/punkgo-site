<script lang="ts">
	import { LOGO } from '$lib/assets/ascii-art';
</script>

<pre class="ascii-logo" aria-label="PunkGo">{LOGO}</pre>

<style>
	.ascii-logo {
		font-family: monospace;
		color: var(--neon-green);
		text-align: center;
		font-size: clamp(0.35rem, 1.2vw, 0.85rem);
		line-height: 1.2;
		text-shadow: 0 0 10px var(--pixel-shadow), 0 0 20px var(--pixel-shadow);
		user-select: none;
		white-space: pre;
		overflow: hidden;
	}

	@media (max-width: 600px) {
		.ascii-logo {
			font-size: 0.3rem;
		}
	}
</style>
