<script lang="ts">
	import { getLocale } from '$lib/i18n/index.svelte';

	const posts = [
		{
			slug: 'hash-chains-vs-merkle-trees',
			en: {
				title: 'Hash Chains vs Merkle Trees',
				description: "Why most AI agent audit trails can't prove completeness"
			},
			zh: {
				title: '哈希链 vs Merkle 树',
				description: '为什么大多数 AI agent 审计方案无法证明完整性'
			},
			date: '2026-03-13'
		}
	];

	function loc(post: typeof posts[0]) {
		return getLocale() === 'zh' ? post.zh : post.en;
	}
</script>

<svelte:head>
	<title>{getLocale() === 'zh' ? '博客' : 'Blog'} — PunkGo</title>
	<meta name="description" content={getLocale() === 'zh'
		? 'PunkGo 工程博客——AI agent 密码学问责'
		: 'PunkGo engineering blog — cryptographic accountability for AI agents'
	} />
</svelte:head>

<section class="blog-index">
	<h1 class="blog-title">// {getLocale() === 'zh' ? '博客' : 'Blog'}</h1>
	<p class="blog-subtitle">{getLocale() === 'zh'
		? 'AI agent 密码学问责的工程笔记。'
		: 'Engineering notes on cryptographic accountability for AI agents.'
	}</p>

	<div class="post-list">
		{#each posts as post}
			<a href="/blog/{post.slug}/" class="post-card">
				<span class="post-date">{post.date}</span>
				<h2 class="post-name">{loc(post).title}</h2>
				<p class="post-desc">{loc(post).description}</p>
			</a>
		{/each}
	</div>
</section>

<style>
	.blog-index {
		max-width: 740px;
		margin: 0 auto;
		padding: 120px 24px 80px;
	}

	.blog-title {
		font-family: var(--font-pixel);
		font-size: 18px;
		color: var(--neon-green);
		text-shadow: 0 0 12px var(--pixel-shadow);
		margin-bottom: 8px;
	}

	.blog-subtitle {
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--text-dim);
		margin-bottom: 48px;
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.post-card {
		display: block;
		padding: 20px;
		border: 2px solid rgba(57, 255, 20, 0.15);
		background: rgba(57, 255, 20, 0.02);
		transition: border-color 0.2s, background 0.2s;
	}

	.post-card:hover {
		border-color: var(--neon-green);
		background: rgba(57, 255, 20, 0.05);
	}

	.post-date {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--neon-blue);
	}

	.post-name {
		font-family: var(--font-pixel);
		font-size: 13px;
		color: var(--neon-green);
		margin: 8px 0;
		line-height: 1.5;
	}

	.post-desc {
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.blog-index {
			padding: 100px 16px 60px;
		}
	}
</style>
