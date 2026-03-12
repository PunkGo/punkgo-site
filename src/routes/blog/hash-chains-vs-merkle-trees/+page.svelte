<script lang="ts">
	import { getLocale } from '$lib/i18n/index.svelte';
	import En from '$lib/posts/hash-chains-vs-merkle-trees/en.md';
	import Zh from '$lib/posts/hash-chains-vs-merkle-trees/zh.md';
</script>

{#if getLocale() === 'zh'}
	<Zh />
{:else}
	<En />
{/if}
