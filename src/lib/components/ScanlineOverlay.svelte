<div class="scanline-overlay" aria-hidden="true"></div>

<style>
	.scanline-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.03) 0px,
			rgba(0, 0, 0, 0.03) 1px,
			transparent 1px,
			transparent 2px
		);
		box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.35);
	}

	@media (prefers-reduced-motion: reduce) {
		.scanline-overlay {
			display: none;
		}
	}
</style>
