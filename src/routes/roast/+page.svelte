<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';

	interface Dog {
		name: string;
		mbti: string;
		color: string;
		accent: string;
		img: string;
	}

	const dogs: Dog[] = [
		{ name: "Philosopher", mbti: "INTP", color: "#E0EFDA", accent: "#5A8C6A", img: "dog-philosopher.png" },
		{ name: "Architect", mbti: "INTJ", color: "#D0D8C4", accent: "#5A6B50", img: "dog-architect.png" },
		{ name: "Intern", mbti: "ENFP", color: "#FFE0EC", accent: "#C75050", img: "dog-intern.png" },
		{ name: "Commander", mbti: "ENTJ", color: "#E8D0D8", accent: "#6B5060", img: "dog-commander.png" },
		{ name: "Rereader", mbti: "ISTJ", color: "#FFE8D0", accent: "#C08040", img: "dog-rereader.png" },
		{ name: "Caretaker", mbti: "ISFJ", color: "#F5E6D8", accent: "#8B7060", img: "dog-caretaker.png" },
		{ name: "Perfectionist", mbti: "INFJ", color: "#E8D8F0", accent: "#8060A0", img: "dog-perfectionist.png" },
		{ name: "Mentor", mbti: "ENFJ", color: "#D8D0E8", accent: "#605080", img: "dog-mentor.png" },
		{ name: "Vampire", mbti: "ISTP", color: "#D0D4DC", accent: "#505868", img: "dog-vampire.png" },
		{ name: "Drifter", mbti: "ISFP", color: "#F0E8F8", accent: "#7060A0", img: "dog-drifter.png" },
		{ name: "Goldfish", mbti: "ESFP", color: "#D8F0F4", accent: "#408090", img: "dog-goldfish.png" },
		{ name: "Helper", mbti: "ESFJ", color: "#E0F0D0", accent: "#508050", img: "dog-helper.png" },
		{ name: "Brute", mbti: "ESTJ", color: "#F4D0C8", accent: "#B04040", img: "dog-brute.png" },
		{ name: "Ghost", mbti: "INFP", color: "#E8E8E8", accent: "#808080", img: "dog-ghost.png" },
		{ name: "Speedrunner", mbti: "ESTP", color: "#FFF0C8", accent: "#B09030", img: "dog-speedrunner.png" },
		{ name: "Googler", mbti: "ENTP", color: "#D0E0F4", accent: "#4070B0", img: "dog-googler.png" },
	];
</script>

<svelte:head>
	<title>PunkGo Roast — What's your AI vibe?</title>
	<meta property="og:title" content="What's your AI vibe?" />
	<meta property="og:description" content="AI personality diagnosis based on your real coding data. 16 dog breeds. No quiz." />
	<meta property="og:image" content="https://punkgo.ai/roast/og-image.png" />
	<meta property="og:url" content="https://punkgo.ai/roast/" />
	<meta name="twitter:card" content="summary_large_image" />
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="roast-page">
	<!-- Hero -->
	<section class="hero">
		<h1>{t('roast.title')}</h1>
		<p>{t('roast.subtitle')}</p>
		<a href="#install" class="hero-cta">{t('roast.cta')}</a>
	</section>

	<!-- Example Card -->
	<section class="example-section">
		<img src="/roast/example-card.svg" alt="Example roast card" class="example-card" />
	</section>

	<!-- Install Extension -->
	<section class="install-section" id="install">
		<!-- TODO: Replace href with real Chrome Web Store URL after approval -->
		<a class="install-ext-btn" href="https://github.com/PunkGo/punkgo-roast-extension" target="_blank">
			{lang === 'zh' ? '安装 Chrome 扩展 — 免费' : 'Install Chrome Extension — Free'}
		</a>
		<p class="install-platforms">{lang === 'zh' ? '支持 ChatGPT · DeepSeek · Kimi · 豆包' : 'Works with ChatGPT · DeepSeek · Kimi · Doubao'}</p>

		<details class="cli-alt">
			<summary>{lang === 'zh' ? '或者用 CLI（开发者）' : 'Or use CLI (developers)'}</summary>
			<div class="install-cmd">curl -fsSL https://raw.githubusercontent.com/PunkGo/punkgo-jack/main/install.sh | bash && punkgo-jack roast</div>
		</details>
	</section>

	<!-- How it works -->
	<section class="how-section">
		<h2>{t('roast.how_title')}</h2>
		<div class="steps">
			<div class="step">
				<div class="step-num">1</div>
				<div class="step-text">{t('roast.step1')}</div>
			</div>
			<div class="step">
				<div class="step-num">2</div>
				<div class="step-text">{t('roast.step2')}</div>
			</div>
			<div class="step">
				<div class="step-num">3</div>
				<div class="step-text">{t('roast.step3')}</div>
			</div>
		</div>
	</section>

	<!-- Grid -->
	<section class="grid-section">
		<h2>{t('roast.grid_title')}</h2>
		<div class="dog-grid">
			{#each dogs as dog}
				<div class="dog-card" style="--card-bg: {dog.color}; --accent: {dog.accent}">
					<img src="/roast/{dog.img}" alt={dog.name} loading="lazy" />
					<div class="name">{dog.name}</div>
					<div class="mbti">{dog.mbti}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Brand footer -->
	<section class="brand-footer">
		<p>{@html t('roast.brand_footer').replace('{link}', '<a href="/">PunkGo</a>')}</p>
	</section>
</div>

<style>
	.roast-page {
		font-family: 'Space Grotesk', sans-serif;
		max-width: 1200px;
		margin: 0 auto;
		padding: 60px 24px;
	}
	.hero {
		text-align: center;
		margin-bottom: 48px;
	}
	.hero h1 {
		font-size: 48px;
		font-weight: 700;
		color: #f0f0f0;
		margin-bottom: 16px;
		line-height: 1.1;
	}
	.hero p {
		font-size: 18px;
		color: #8b8b8b;
		max-width: 600px;
		margin: 0 auto 32px;
		line-height: 1.6;
	}
	.hero-cta {
		display: inline-block;
		padding: 14px 36px;
		background: #39ff14;
		color: #0a0a0a;
		font-family: 'Space Grotesk', sans-serif;
		font-size: 16px;
		font-weight: 700;
		border-radius: 8px;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.hero-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(57, 255, 20, 0.3);
	}
	.example-section {
		text-align: center;
		margin-bottom: 60px;
	}
	.example-card {
		max-width: 480px;
		width: 100%;
		border-radius: 16px;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
	}
	.install-section {
		text-align: center;
		margin-bottom: 60px;
		padding: 48px 24px;
		background: #111;
		border-radius: 16px;
		border: 1px solid #222;
	}
	.install-section h2 {
		font-size: 28px;
		color: #e0e0e0;
		margin-bottom: 24px;
	}
	.install-ext-btn {
		display: inline-block;
		padding: 16px 48px;
		background: #39ff14;
		color: #000;
		font-size: 18px;
		font-weight: 700;
		border-radius: 12px;
		text-decoration: none;
		margin-bottom: 12px;
		transition: transform 0.15s ease, box-shadow 0.15s ease;
	}
	.install-ext-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
	}
	.install-platforms {
		color: #888;
		font-size: 14px;
		margin-bottom: 24px;
	}
	.cli-alt {
		color: #555;
		font-size: 13px;
		cursor: pointer;
	}
	.cli-alt summary {
		color: #666;
		margin-bottom: 8px;
	}
	.install-cmd {
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		color: #39ff14;
		background: #0a0a0a;
		padding: 12px 20px;
		border-radius: 8px;
		display: inline-block;
		border: 1px solid #333;
		user-select: all;
		overflow-x: auto;
		max-width: 100%;
	}
	.install-note {
		font-size: 14px;
		color: #666;
	}
	.how-section {
		text-align: center;
		margin-bottom: 80px;
	}
	.how-section h2 {
		font-size: 24px;
		color: #e0e0e0;
		margin-bottom: 32px;
	}
	.steps {
		display: flex;
		justify-content: center;
		gap: 48px;
		flex-wrap: wrap;
	}
	.step {
		max-width: 200px;
	}
	.step-num {
		font-size: 36px;
		font-weight: 700;
		color: #39ff14;
		margin-bottom: 8px;
	}
	.step-text {
		font-size: 14px;
		color: #8b8b8b;
		line-height: 1.5;
		white-space: pre-line;
	}
	.grid-section {
		margin-bottom: 80px;
	}
	.grid-section h2 {
		text-align: center;
		font-size: 28px;
		color: #e0e0e0;
		margin-bottom: 40px;
	}
	.dog-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
	.dog-card {
		background: var(--card-bg);
		border-radius: 16px;
		padding: 20px;
		text-align: center;
		transition: transform 0.2s, box-shadow 0.2s;
		cursor: default;
	}
	.dog-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(255, 255, 255, 0.08);
	}
	.dog-card img {
		width: 120px;
		height: 120px;
		object-fit: contain;
		margin-bottom: 12px;
	}
	.dog-card .name {
		font-size: 16px;
		font-weight: 700;
		color: #1a1a1a;
		margin-bottom: 4px;
	}
	.dog-card .mbti {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 2px;
		color: var(--accent);
	}
	.brand-footer {
		text-align: center;
		padding: 40px 0;
		border-top: 1px solid #222;
	}
	.brand-footer p {
		font-size: 14px;
		color: #666;
	}
	@media (max-width: 800px) {
		.dog-grid { grid-template-columns: repeat(2, 1fr); }
		.hero h1 { font-size: 32px; }
	}
</style>
