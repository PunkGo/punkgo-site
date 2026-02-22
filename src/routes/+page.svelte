<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Philosophy from '$lib/components/Philosophy.svelte';
	import Architecture from '$lib/components/Architecture.svelte';
	import QuickStart from '$lib/components/QuickStart.svelte';
	import ShowcaseEntry from '$lib/components/ShowcaseEntry.svelte';
</script>

<svelte:head>
	<title>PunkGo — Right to History</title>
</svelte:head>

<section id="hero">
	<Hero />
</section>

<section id="philosophy">
	<Philosophy />
</section>

<section id="architecture">
	<Architecture />
</section>

<section id="quickstart">
	<QuickStart />
</section>

<section id="showcase">
	<ShowcaseEntry />
</section>
