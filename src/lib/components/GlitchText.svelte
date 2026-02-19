<script lang="ts">
	let {
		text,
		typingSpeed = 80,
		glitchAfterTyping = true,
		class: className = ''
	}: {
		text: string;
		typingSpeed?: number;
		glitchAfterTyping?: boolean;
		class?: string;
	} = $props();

	let displayed = $state('');
	let doneTyping = $state(false);

	$effect(() => {
		displayed = '';
		doneTyping = false;
		let i = 0;
		const interval = setInterval(() => {
			if (i < text.length) {
				displayed = text.slice(0, i + 1);
				i++;
			} else {
				doneTyping = true;
				clearInterval(interval);
			}
		}, typingSpeed);
		return () => clearInterval(interval);
	});
</script>

<span
	class="glitch-wrap {className}"
	class:glitch={doneTyping && glitchAfterTyping}
	data-text={text}
>
	{displayed}<span class="cursor" class:hidden={doneTyping}>_</span>
</span>

<style>
	.glitch-wrap {
		position: relative;
		display: inline-block;
	}

	.cursor {
		animation: blink 0.7s infinite;
	}
	.cursor.hidden {
		display: none;
	}

	.glitch {
		animation: glitch-skew 4s infinite;
	}
	.glitch::before,
	.glitch::after {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.glitch::before {
		color: var(--neon-pink);
		animation: glitch 0.3s infinite;
		clip-path: inset(0 0 65% 0);
		opacity: 0.8;
	}
	.glitch::after {
		color: var(--neon-blue);
		animation: glitch 0.3s infinite reverse;
		clip-path: inset(65% 0 0 0);
		opacity: 0.8;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}
	@keyframes glitch {
		0% { transform: translate(0); }
		20% { transform: translate(-2px, 2px); }
		40% { transform: translate(-2px, -2px); }
		60% { transform: translate(2px, 2px); }
		80% { transform: translate(2px, -2px); }
		100% { transform: translate(0); }
	}
	@keyframes glitch-skew {
		0% { transform: skew(0deg); }
		20% { transform: skew(-1deg); }
		40% { transform: skew(0.5deg); }
		60% { transform: skew(-0.3deg); }
		80% { transform: skew(0.8deg); }
		100% { transform: skew(0deg); }
	}
</style>
