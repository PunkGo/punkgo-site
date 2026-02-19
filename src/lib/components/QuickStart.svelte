<script lang="ts">
	import { t } from '$lib/i18n/index.svelte';
	import TerminalBlock from './TerminalBlock.svelte';
	import { DIVIDER } from '$lib/assets/ascii-art';

	const buildCode = `# Clone the repo
git clone https://github.com/PunkGo/punkgo-kernel.git
cd punkgo-kernel

# Build
cargo build --workspace

# Run all tests
cargo test --workspace`;

	const kernelCode = `# Start the kernel daemon
cargo run --bin punkgo-kerneld`;

	const cliCode = `# Check kernel health
cargo run --bin punkgo-cli -- read health

# Create a new actor
cargo run --bin punkgo-cli -- seed-actor alice --energy 5000

# Submit an action
cargo run --bin punkgo-cli -- submit '{
  "actor_id": "root",
  "action_type": "mutate",
  "target": "workspace/hello",
  "payload": {"msg": "world"}
}'

# View recent events
cargo run --bin punkgo-cli -- read events --limit 5

# Query audit trail
cargo run --bin punkgo-cli -- audit checkpoint
cargo run --bin punkgo-cli -- audit proof 0`;
</script>

<div class="quickstart">
	<pre class="divider">{DIVIDER}</pre>

	<h2 class="section-title">{t('quickstart.title')}</h2>

	<TerminalBlock title={t('quickstart.build_title')} code={buildCode} />
	<TerminalBlock title={t('quickstart.kernel_title')} code={kernelCode} />
	<TerminalBlock title={t('quickstart.cli_title')} code={cliCode} />
</div>

<style>
	.quickstart {
		padding: var(--space-xl) 0;
	}

	.divider {
		font-family: monospace;
		color: var(--text-dim);
		text-align: center;
		font-size: 0.8rem;
		margin-bottom: var(--space-lg);
		opacity: 0.4;
		overflow: hidden;
	}

	.section-title {
		font-family: var(--font-pixel);
		font-size: clamp(12px, 2vw, 16px);
		color: var(--neon-green);
		margin-bottom: var(--space-lg);
		text-shadow: 0 0 10px var(--pixel-shadow);
	}
</style>
