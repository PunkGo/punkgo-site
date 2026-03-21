<script lang="ts">
	import type { Snippet } from 'svelte';
	import PixelNav from '$lib/components/PixelNav.svelte';
	import ScanlineOverlay from '$lib/components/ScanlineOverlay.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { initLocale } from '$lib/i18n/index.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import 'nes.css/css/nes-core.min.css';
	import '$lib/styles/global.css';
	import '$lib/styles/animations.css';

	injectAnalytics();
	injectSpeedInsights();

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		initLocale();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
	<link rel="apple-touch-icon" href="/icon-192.png" />
	<meta property="og:title" content="PunkGo — Every AI action gets a receipt" />
	<meta property="og:image" content="https://punkgo.ai/icon-192.png" />
	<meta property="og:description" content="Dashcam for AI coding. Append-only audit trail with Ed25519 signatures and RFC 3161 timestamps for Claude Code and Cursor." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://punkgo.ai" />
	<meta name="description" content="PunkGo — dashcam for AI coding. Every tool call gets a cryptographic receipt. Supports Claude Code, Cursor, MCP. Built with Rust." />
	<meta name="theme-color" content="#0a0a0a" />
</svelte:head>

<ScanlineOverlay />
<PixelNav />
<main>
	{@render children()}
</main>
<Footer />
