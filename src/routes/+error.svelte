<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-page">
	<pre class="ascii-404">
  ██╗  ██╗ ██████╗ ██╗  ██╗
  ██║  ██║██╔═══██╗██║  ██║
  ███████║██║   ██║███████║
  ╚════██║██║   ██║╚════██║
       ██║╚██████╔╝     ██║
       ╚═╝ ╚═════╝      ╚═╝
	</pre>

	<h1 class="error-title">{page.status}</h1>
	<p class="error-msg">{page.error?.message ?? 'Page not found'}</p>
	<p class="error-hint">&gt; this path has no history</p>

	<a href="/" class="home-link">[RETURN TO ORIGIN]</a>
</div>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--space-lg);
		background: var(--bg-primary);
	}

	.ascii-404 {
		font-family: monospace;
		color: var(--neon-pink);
		font-size: clamp(0.3rem, 1.5vw, 0.7rem);
		line-height: 1.2;
		margin-bottom: var(--space-md);
		text-shadow: 0 0 15px rgba(255, 45, 149, 0.4);
	}

	.error-title {
		font-family: var(--font-pixel);
		font-size: 14px;
		color: var(--neon-pink);
		margin-bottom: var(--space-sm);
	}

	.error-msg {
		font-family: var(--font-terminal);
		font-size: 1.2rem;
		color: var(--text-dim);
		margin-bottom: var(--space-sm);
	}

	.error-hint {
		font-family: var(--font-terminal);
		font-size: 1rem;
		color: var(--neon-green);
		margin-bottom: var(--space-lg);
	}

	.home-link {
		font-family: var(--font-pixel);
		font-size: 10px;
		color: var(--neon-green);
		border: var(--border-pixel);
		padding: 10px 20px;
		text-decoration: none;
	}
	.home-link:hover {
		background: var(--neon-green);
		color: var(--bg-primary);
	}
</style>
