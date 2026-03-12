<script lang="ts">
	let { title, date, description, author = 'Felix', children } = $props();
</script>

<svelte:head>
	<title>{title} — PunkGo Blog</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
</svelte:head>

<article class="blog-post">
	<header class="post-header">
		<div class="post-meta">
			<span class="post-date">{date}</span>
			<span class="post-author">by {author}</span>
		</div>
		<h1 class="post-title">{title}</h1>
		<p class="post-desc">{description}</p>
		<div class="pixel-divider">═══════════════════════════════════</div>
	</header>

	<div class="post-content">
		{@render children()}
	</div>

	<footer class="post-footer">
		<div class="pixel-divider">═══════════════════════════════════</div>
		<a href="/blog/" class="back-link">&lt; ALL POSTS</a>
	</footer>
</article>

<style>
	.blog-post {
		max-width: 740px;
		margin: 0 auto;
		padding: 120px 24px 80px;
	}

	.post-header {
		margin-bottom: 48px;
	}

	.post-meta {
		font-family: var(--font-readable);
		font-size: 14px;
		color: var(--text-dim);
		margin-bottom: 16px;
		display: flex;
		gap: 16px;
	}

	.post-date {
		color: var(--neon-blue);
	}

	.post-author {
		color: var(--text-dim);
	}

	/* Title: pixel font — short, decorative, brand identity */
	.post-title {
		font-family: var(--font-pixel);
		font-size: 18px;
		color: var(--neon-green);
		line-height: 1.6;
		margin-bottom: 12px;
		text-shadow: 0 0 12px var(--pixel-shadow);
	}

	.post-desc {
		font-family: var(--font-readable);
		font-size: 17px;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.pixel-divider {
		font-family: var(--font-mono);
		color: var(--neon-green);
		opacity: 0.4;
		font-size: 12px;
		margin: 24px 0;
		overflow: hidden;
	}

	/* Body: readable font — long-form, comfortable reading */
	.post-content {
		font-family: var(--font-readable);
		font-size: 16px;
		line-height: 1.9;
		color: var(--text-primary);
		letter-spacing: 0.01em;
	}

	/* Section headers: readable font, neon accent */
	.post-content :global(h2) {
		font-family: var(--font-readable);
		font-size: 20px;
		font-weight: 700;
		color: var(--neon-pink);
		margin: 56px 0 20px;
		text-shadow: 0 0 8px rgba(255, 45, 149, 0.2);
	}

	.post-content :global(h3) {
		font-family: var(--font-readable);
		font-size: 17px;
		font-weight: 700;
		color: var(--neon-blue);
		margin: 36px 0 14px;
	}

	.post-content :global(p) {
		margin: 18px 0;
	}

	.post-content :global(a) {
		color: var(--neon-green);
		text-decoration: underline;
		text-decoration-style: dotted;
		text-underline-offset: 3px;
	}
	.post-content :global(a:hover) {
		color: var(--neon-pink);
		text-shadow: 0 0 6px var(--neon-pink);
	}

	/* Inline code: subtle highlight */
	.post-content :global(code) {
		font-family: var(--font-mono);
		background: rgba(255, 255, 255, 0.06);
		padding: 2px 7px;
		border-radius: 3px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		font-size: 0.9em;
		color: var(--neon-yellow);
	}

	/* Code blocks: terminal feel */
	.post-content :global(pre) {
		background: #0d1117;
		border: 1px solid rgba(57, 255, 20, 0.15);
		border-left: 3px solid var(--neon-green);
		padding: 20px 24px;
		overflow-x: auto;
		margin: 28px 0;
		font-size: 14px;
		line-height: 1.7;
		border-radius: 2px;
	}

	.post-content :global(pre code) {
		font-family: var(--font-mono);
		background: none;
		border: none;
		border-radius: 0;
		padding: 0;
		color: var(--text-primary);
		font-size: 14px;
	}

	.post-content :global(blockquote) {
		border-left: 3px solid var(--neon-green);
		padding: 12px 20px;
		margin: 28px 0;
		background: rgba(57, 255, 20, 0.03);
		color: var(--text-secondary);
		font-style: italic;
	}

	/* Tables: readable font for cells, pixel for headers */
	.post-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 28px 0;
		font-size: 14px;
	}

	.post-content :global(th) {
		font-family: var(--font-pixel);
		font-size: 9px;
		color: var(--neon-green);
		text-align: left;
		padding: 10px 12px;
		border-bottom: 2px solid var(--neon-green);
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.post-content :global(td) {
		font-family: var(--font-readable);
		padding: 10px 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		line-height: 1.6;
	}

	.post-content :global(strong) {
		color: #fff;
		font-weight: 700;
	}

	.post-content :global(em) {
		color: var(--text-secondary);
		font-style: italic;
	}

	.post-content :global(ul), .post-content :global(ol) {
		padding-left: 24px;
		margin: 18px 0;
	}

	.post-content :global(li) {
		margin: 10px 0;
		line-height: 1.7;
	}

	.post-content :global(li::marker) {
		color: var(--neon-green);
	}

	.post-content :global(img) {
		width: 100%;
		margin: 32px 0;
		border: 1px solid rgba(57, 255, 20, 0.1);
		border-radius: 4px;
	}

	.post-content :global(hr) {
		border: none;
		border-top: 1px solid rgba(57, 255, 20, 0.15);
		margin: 48px 0;
	}

	.post-footer {
		margin-top: 64px;
	}

	.back-link {
		font-family: var(--font-pixel);
		font-size: 10px;
		color: var(--neon-green);
	}
	.back-link:hover {
		color: var(--neon-pink);
		text-shadow: 0 0 8px var(--neon-pink);
	}

	@media (max-width: 768px) {
		.blog-post {
			padding: 100px 16px 60px;
		}
		.post-title {
			font-size: 14px;
		}
		.post-content {
			font-size: 15px;
		}
	}
</style>
