<script lang="ts">
	let {
		title = 'terminal',
		code
	}: {
		title?: string;
		code: string;
	} = $props();

	let copied = $state(false);

	function copyCode() {
		navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	type LineType = 'comment' | 'command' | 'continuation' | 'empty';

	function parseLines(src: string): { type: LineType; text: string }[] {
		const raw = src.split('\n');
		const result: { type: LineType; text: string }[] = [];
		let inMultiline = false;

		for (const line of raw) {
			const trimmed = line.trimStart();
			if (trimmed === '') {
				result.push({ type: 'empty', text: '' });
				inMultiline = false;
				continue;
			}
			if (inMultiline) {
				// Check if this line closes the multiline (ends with ')
				if (trimmed.endsWith("'") || trimmed.endsWith("}'")) {
					inMultiline = false;
				}
				result.push({ type: 'continuation', text: line });
				continue;
			}
			if (trimmed.startsWith('#')) {
				result.push({ type: 'comment', text: line });
				continue;
			}
			// Check if command opens a multiline block (has unclosed quote)
			const singleQuotes = (trimmed.match(/'/g) || []).length;
			if (singleQuotes % 2 !== 0) {
				inMultiline = true;
			}
			result.push({ type: 'command', text: line });
		}
		return result;
	}

	let lines = $derived(parseLines(code));
</script>

<div class="terminal">
	<div class="title-bar">
		<div class="dots">
			<span class="dot dot-r"></span>
			<span class="dot dot-y"></span>
			<span class="dot dot-g"></span>
		</div>
		<span class="title">{title}</span>
		<button class="copy-btn" onclick={copyCode}>
			{copied ? '[ OK ]' : '[ COPY ]'}
		</button>
	</div>
	<div class="code-area">
		{#each lines as line}
			{#if line.type === 'empty'}
				<div class="line empty">&nbsp;</div>
			{:else if line.type === 'comment'}
				<div class="line comment">{line.text}</div>
			{:else if line.type === 'continuation'}
				<div class="line continuation"><span class="prompt-pad"></span> {line.text}</div>
			{:else}
				<div class="line command"><span class="prompt">$</span> {line.text}</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.terminal {
		background: var(--bg-terminal);
		border: 2px solid #333;
		margin-bottom: var(--space-md);
		overflow: hidden;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.3);
	}

	.title-bar {
		display: flex;
		align-items: center;
		padding: 8px 14px;
		background: #111;
		border-bottom: 1px solid #333;
		gap: 8px;
	}

	.dots {
		display: flex;
		gap: 6px;
	}
	.dot {
		width: 10px;
		height: 10px;
	}
	.dot-r { background: #ff5f56; }
	.dot-y { background: #ffbd2e; }
	.dot-g { background: #27c93f; }

	.title {
		flex: 1;
		font-family: var(--font-pixel);
		font-size: 8px;
		color: #555;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	.copy-btn {
		background: none;
		border: 1px solid #444;
		color: #555;
		font-family: var(--font-pixel);
		font-size: 7px;
		padding: 3px 8px;
		cursor: pointer;
		letter-spacing: 1px;
		transition: all 0.15s;
	}
	.copy-btn:hover {
		border-color: var(--neon-green);
		color: var(--neon-green);
		box-shadow: 0 0 6px var(--pixel-shadow);
	}

	.code-area {
		padding: 16px 20px;
		overflow-x: auto;
		font-family: 'Press Start 2P', monospace;
		font-size: 9px;
		line-height: 2.2;
	}

	.line {
		white-space: pre;
	}

	.comment {
		color: #555;
	}

	.command {
		color: var(--neon-green);
		text-shadow: 0 0 4px var(--pixel-shadow);
	}

	.continuation {
		color: var(--neon-yellow);
		padding-left: 2px;
	}

	.prompt {
		color: var(--neon-pink);
		margin-right: 6px;
		user-select: none;
	}

	.prompt-pad {
		display: inline-block;
		width: 1ch;
		margin-right: 6px;
	}

	.empty {
		height: 8px;
	}

	.code-area::-webkit-scrollbar {
		height: 6px;
	}
	.code-area::-webkit-scrollbar-track {
		background: var(--bg-terminal);
	}
	.code-area::-webkit-scrollbar-thumb {
		background: #333;
	}
</style>
