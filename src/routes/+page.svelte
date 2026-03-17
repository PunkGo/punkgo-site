<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Why from '$lib/components/Why.svelte';
	import TrustLayers from '$lib/components/TrustLayers.svelte';
	import QuickStart from '$lib/components/QuickStart.svelte';
	import SupportedTools from '$lib/components/SupportedTools.svelte';
	import ShowcaseEntry from '$lib/components/ShowcaseEntry.svelte';
</script>

<svelte:head>
	<title>PunkGo — Every AI action gets a receipt</title>
</svelte:head>

<section id="hero">
	<Hero />
</section>

<section id="why">
	<Why />
</section>

<section id="quickstart">
	<QuickStart />
</section>

<section id="trust">
	<TrustLayers />
</section>

<section id="tools">
	<SupportedTools />
</section>

<section id="showcase">
	<ShowcaseEntry />
</section>
