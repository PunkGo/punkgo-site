<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();

	const API_BASE = 'https://n78.xyz';

	let share = $derived(data.share);
	let phase = $state<'loading' | 'flip' | 'result'>('loading');
	let flipped = $state(false);
	let shaking = $state(false);
	let ready = $state(false);
	let copied = $state(false);
	let saveFailed = $state(false);

	onMount(() => {
		if (share) {
			phase = 'flip';
			// Sequence: glow (1s) → shake (1.2s) → ready
			setTimeout(() => { shaking = true; }, 1000);
			setTimeout(() => { shaking = false; ready = true; }, 2200);
		}
	});

	function flip() {
		if (flipped || !ready) return;
		flipped = true;
		setTimeout(() => (phase = 'result'), 700);
	}

	function getCardSvgUrl(): string {
		if (!share) return '';
		return `${API_BASE}/api/v1/roast/share/${share.id}/card`;
	}

	async function downloadPng() {
		try {
			// Fetch SVG text, inline all content, render via canvas
			const url = getCardSvgUrl();
			const res = await fetch(url);
			if (!res.ok) throw new Error('fetch failed');
			const svgText = await res.text();

			// Create blob URL from SVG text
			const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
			const blobUrl = URL.createObjectURL(blob);

			const img = new Image(800, 1040);
			img.src = blobUrl;

			await new Promise<void>((resolve, reject) => {
				img.onload = () => resolve();
				img.onerror = () => reject(new Error('img load failed'));
			});

			const canvas = document.createElement('canvas');
			canvas.width = 800;
			canvas.height = 1040;
			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('no canvas context');
			ctx.drawImage(img, 0, 0, 800, 1040);
			URL.revokeObjectURL(blobUrl);

			// Try canvas export — may fail if SVG has external refs
			try {
				const dataUrl = canvas.toDataURL('image/png');
				const link = document.createElement('a');
				link.download = `punkgo-roast-${share?.personality_id || 'card'}.png`;
				link.href = dataUrl;
				link.click();
			} catch {
				// Canvas tainted — fallback: open SVG in new tab for manual save
				window.open(url, '_blank');
			}
		} catch {
			saveFailed = true;
			setTimeout(() => saveFailed = false, 3000);
		}
	}

	function copyLink() {
		const url = `https://punkgo.ai/roast/s/${share?.id}`;
		navigator.clipboard.writeText(url).then(
			() => {
				copied = true;
				setTimeout(() => (copied = false), 2000);
			},
			() => {
				window.prompt('Copy this link:', url);
			}
		);
	}
</script>

<svelte:head>
	{#if share}
		<title
			>{share.personality_name_zh || share.personality_name} ({share.mbti}) — PunkGo Roast</title
		>
		<meta
			property="og:title"
			content="{share.personality_name_zh || share.personality_name} ({share.mbti}) — PunkGo Roast"
		/>
		<meta
			property="og:description"
			content="我的AI是{share.personality_name_zh || share.personality_name}。你的呢？"
		/>
		<meta property="og:image" content="{API_BASE}/api/v1/roast/share/{share.id}/card" />
		<meta property="og:url" content="https://punkgo.ai/roast/s/{share.id}" />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<div class="reveal-page">
	{#if phase === 'loading'}
		<p class="loading">Loading...</p>
	{:else if phase === 'flip' && share}
		<!-- Card flip -->
		<div
			class="flip-container"
			onclick={flip}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Enter' && flip()}
		>
			<div class="card" class:flipped class:shaking class:ready>
				<div class="card-back">
					<div class="paw">🐾</div>
					<div class="brand">PUNKGO<br />ROAST</div>
					<div class="question">?</div>
				</div>
				<div class="card-front">
					<img src={getCardSvgUrl()} alt={share.personality_name} width="400" height="520" />
				</div>
			</div>
			{#if !flipped}
				<p class="hint">{ready ? (share.locale === 'zh' ? '点击揭晓' : 'Click to reveal') : '...'}</p>
			{/if}
		</div>
	{:else if phase === 'result' && share}
		<div class="result-phase">
			<img
				class="card-svg"
				src={getCardSvgUrl()}
				alt={share.personality_name}
				width="400"
				height="520"
			/>

			<div class="actions">
				<button class="save-btn" onclick={downloadPng}>
					{saveFailed ? (share.locale === 'zh' ? '保存失败，点击打开SVG' : 'Failed — open SVG') : (share.locale === 'zh' ? '保存图片' : 'Save PNG')}
				</button>
				<button class="share-btn" onclick={copyLink}>
					{copied
						? share.locale === 'zh'
							? '已复制!'
							: 'Copied!'
						: share.locale === 'zh'
							? '复制链接'
							: 'Copy Link'}
				</button>
			</div>

			<div class="cta">
				<h2>{share.locale === 'zh' ? '你的 AI 是什么狗？' : 'What kind of dog is your AI?'}</h2>
				<p>
					{share.locale === 'zh'
						? '分析你的 AI 聊天记录，找到你的 MBTI 狗子'
						: 'Analyze your AI chats to find your MBTI dog'}
				</p>
				<a
					class="install-btn"
					href="https://chromewebstore.google.com/detail/punkgo-roast"
					target="_blank"
				>
					{share.locale === 'zh' ? '安装插件' : 'Install Extension'}
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.reveal-page {
		min-height: 100vh;
		background: #0a0a0a;
		color: #e0e0e0;
		font-family: 'DM Sans', system-ui, sans-serif;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.loading {
		color: #666;
		font-size: 16px;
	}

	/* Card flip */
	.flip-container {
		perspective: 1000px;
		cursor: pointer;
		text-align: center;
	}
	.card {
		width: 400px;
		height: 520px;
		position: relative;
		transition: transform 0.7s ease-out;
		transform-style: preserve-3d;
	}
	.card.flipped {
		transform: rotateY(180deg);
	}
	.card-back,
	.card-front {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.card-back {
		background: #111;
		border: 2px solid rgba(57, 255, 20, 0.4);
		box-shadow: 0 0 20px rgba(57, 255, 20, 0.3), 0 0 60px rgba(57, 255, 20, 0.15);
		animation: glowPulse 1.5s ease-in-out 2;
		gap: 12px;
	}
	.card.shaking { animation: wiggle 0.4s ease-in-out 3; }
	.card.ready .card-back {
		animation: none;
		box-shadow: 0 0 30px rgba(57, 255, 20, 0.5);
		border-color: rgba(57, 255, 20, 0.6);
	}
	.paw { font-size: 48px; opacity: 0.3; }
	.brand {
		color: #2a2a2a;
		font-size: 24px;
		font-weight: 700;
		text-align: center;
		line-height: 1.1;
	}
	.question {
		color: #333;
		font-size: 64px;
		font-weight: 700;
	}
	.card-front {
		transform: rotateY(180deg);
	}
	.card-front img {
		width: 100%;
		height: 100%;
		border-radius: 20px;
	}
	.hint {
		color: #39ff14;
		font-size: 18px;
		font-weight: 600;
		margin-top: 24px;
		letter-spacing: 2px;
		text-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes glowPulse {
		0%, 100% {
			box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
			border-color: rgba(57, 255, 20, 0.4);
		}
		50% {
			box-shadow: 0 0 40px rgba(57, 255, 20, 0.6);
			border-color: rgba(57, 255, 20, 0.7);
		}
	}
	@keyframes wiggle {
		0%   { transform: translate(0, 0) rotate(0deg); }
		15%  { transform: translate(-3px, 0) rotate(-2deg); }
		30%  { transform: translate(3px, 0) rotate(2deg); }
		45%  { transform: translate(-3px, 0) rotate(-1.5deg); }
		60%  { transform: translate(3px, 0) rotate(1.5deg); }
		75%  { transform: translate(-1px, 0) rotate(-1deg); }
		100% { transform: translate(0, 0) rotate(0deg); }
	}
	@keyframes pulse {
		0%, 100% { opacity: 0.5; }
		50% { opacity: 1; }
	}

	/* Result */
	.result-phase {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 48px 20px;
		gap: 24px;
	}
	.card-svg {
		border-radius: 20px;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
	}

	.actions {
		display: flex;
		gap: 12px;
		width: 400px;
	}
	.save-btn,
	.share-btn {
		flex: 1;
		padding: 12px;
		border: none;
		border-radius: 8px;
		font-family: inherit;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}
	.save-btn {
		background: #39ff14;
		color: #0a0a0a;
	}
	.share-btn {
		background: #1a1a1a;
		color: #39ff14;
		border: 1px solid #333;
	}
	.save-btn:hover {
		box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
	}
	.share-btn:hover {
		border-color: #39ff14;
	}

	.cta {
		text-align: center;
		margin-top: 16px;
		padding: 32px;
		background: #111;
		border-radius: 16px;
		border: 1px solid #222;
		max-width: 400px;
	}
	.cta h2 {
		color: #f0f0f0;
		font-size: 20px;
		margin-bottom: 8px;
	}
	.cta p {
		color: #888;
		font-size: 13px;
		margin-bottom: 20px;
	}
	.install-btn {
		display: inline-block;
		padding: 12px 32px;
		background: #39ff14;
		color: #0a0a0a;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 700;
		text-decoration: none;
	}
	.install-btn:hover {
		box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
	}

	@media (max-width: 480px) {
		.card {
			width: 320px;
			height: 416px;
		}
		.card-svg {
			width: 320px;
			height: auto;
		}
		.actions {
			width: 320px;
		}
		.cta {
			max-width: 320px;
		}
	}
</style>
