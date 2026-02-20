<script lang="ts">
	import type { Snippet } from 'svelte';
	import PixelNav from '$lib/components/PixelNav.svelte';
	import ScanlineOverlay from '$lib/components/ScanlineOverlay.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { initLocale } from '$lib/i18n/index.svelte';
	import 'nes.css/css/nes-core.min.css';
	import '$lib/styles/global.css';
	import '$lib/styles/animations.css';

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		initLocale();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=ZCOOL+QingKe+HuangYou&display=swap"
		rel="stylesheet"
	/>
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
	<link rel="apple-touch-icon" href="/icon-192.png" />
	<meta property="og:title" content="PunkGo - Local Sovereignty Compute Kernel" />
	<meta property="og:image" content="https://punkgo.ai/icon-192.png" />
	<meta property="og:description" content="Your right to write history. Local sovereignty compute kernel built with Rust." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://punkgo.ai" />
	<meta name="description" content="PunkGo - Local sovereignty compute kernel. Your right to write history." />
	<meta name="theme-color" content="#0a0a0a" />
</svelte:head>

<ScanlineOverlay />
<PixelNav />
<main>
	{@render children()}
</main>
<Footer />
