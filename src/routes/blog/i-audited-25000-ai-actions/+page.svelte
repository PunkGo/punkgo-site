<script lang="ts">
	import { getLocale } from '$lib/i18n/index.svelte';
	import En from '$lib/posts/i-audited-25000-ai-actions/en.md';
	import Zh from '$lib/posts/i-audited-25000-ai-actions/zh.md';
</script>

{#if getLocale() === 'zh'}
	<Zh />
{:else}
	<En />
{/if}
