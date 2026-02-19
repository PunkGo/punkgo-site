<script lang="ts">
	import { LOGO } from '$lib/assets/ascii-art';
</script>

<pre class="ascii-logo" aria-label="PunkGo">{LOGO}</pre>

<style>
	.ascii-logo {
		font-family: 'Courier New', Courier, monospace;
		font-weight: bold;
		color: var(--neon-green);
		text-align: center;
		font-size: clamp(0.4rem, 1.2vw, 0.9rem);
		line-height: 1.15;
		text-shadow: 0 0 6px rgba(57, 255, 20, 0.5);
		user-select: none;
		white-space: pre;
		overflow: hidden;
		/* Force crisp rendering on all screens */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: geometricPrecision;
		/* Prevent subpixel blurring from transforms */
		transform: translateZ(0);
		will-change: auto;
		image-rendering: pixelated;
	}

	@media (max-width: 600px) {
		.ascii-logo {
			font-size: 0.28rem;
		}
	}
</style>
