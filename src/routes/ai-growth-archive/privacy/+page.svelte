<script lang="ts">
	import { DIVIDER } from '$lib/assets/ascii-art';
</script>

<svelte:head>
	<title>Privacy Policy — AI Growth Archive | PunkGo</title>
	<meta name="description" content="Privacy policy for AI Growth Archive Chrome extension. We record growth, not surveillance." />
</svelte:head>

<article class="privacy">
	<pre class="divider">{DIVIDER}</pre>

	<h1 class="page-title">Privacy Policy — AI 成长档案</h1>
	<p class="subtitle">AI Growth Archive · Chrome Extension</p>
	<p class="updated">Last updated: 2026-03-17</p>

	<section>
		<h2>Summary</h2>
		<p>AI Growth Archive is a Chrome extension that helps students record and review their AI learning journey on ChatGPT. We are committed to protecting your privacy, especially for minor users.</p>
		<p class="zh">AI 成长档案是一款帮助学生记录和回顾 AI 学习历程的 Chrome 插件。我们致力于保护您的隐私，尤其是未成年用户的隐私。</p>
	</section>

	<section>
		<h2>What Data We Collect</h2>

		<h3>Account Information</h3>
		<ul>
			<li>Email address and display name (for registration and login)</li>
			<li>User role (student or parent)</li>
		</ul>

		<h3>Conversation Metadata</h3>
		<p>When you use ChatGPT with our extension active, we collect:</p>
		<ul>
			<li>Conversation timestamps (start and end time)</li>
			<li>Number of conversation turns</li>
			<li>Duration of conversations</li>
			<li>Topic keywords (automatically extracted)</li>
			<li>First message summary (first 100 characters of your first question)</li>
		</ul>

		<h3>Conversation Content</h3>
		<ul>
			<li>The text content of your conversations with ChatGPT is collected and stored in <strong>encrypted form</strong> (AES-256-GCM) on our servers</li>
			<li>We do <strong>NOT</strong> collect images, files, audio, or video content</li>
			<li>We do <strong>NOT</strong> intercept or modify any API requests to ChatGPT</li>
		</ul>

		<h3>What We Do NOT Collect</h3>
		<ul>
			<li>Passwords (stored only by our authentication provider, Supabase)</li>
			<li>Payment information</li>
			<li>Browsing history outside of ChatGPT</li>
			<li>Device identifiers or fingerprints</li>
			<li>Location data</li>
			<li>Cookies from other websites</li>
		</ul>
	</section>

	<section>
		<h2>How We Use Your Data</h2>
		<div class="table-wrap">
			<table>
				<thead>
					<tr><th>Data</th><th>Purpose</th></tr>
				</thead>
				<tbody>
					<tr><td>Account info</td><td>Authentication and family linking</td></tr>
					<tr><td>Conversation metadata</td><td>Generate weekly learning reports for linked parents</td></tr>
					<tr><td>Encrypted conversation text</td><td>Available for the student to review their own conversations</td></tr>
				</tbody>
			</table>
		</div>
		<p>We do <strong>NOT</strong>:</p>
		<ul>
			<li>Sell your data to third parties</li>
			<li>Use your data for advertising</li>
			<li>Train AI models on your conversations</li>
			<li>Share conversation content with parents (parents only see metadata summaries)</li>
		</ul>
	</section>

	<section>
		<h2>Family Linking &amp; Parental Access</h2>
		<ul>
			<li>Family linking is <strong>student-initiated only</strong> — a parent cannot link to a student's account without the student generating an invite code</li>
			<li>Students can <strong>unlink a parent at any time</strong></li>
			<li>Parents receive <strong>weekly summary reports</strong> containing only metadata (conversation count, duration, topics) — <strong>NOT</strong> conversation content</li>
			<li>Students can mark conversations as private to exclude them from report statistics</li>
		</ul>
	</section>

	<section>
		<h2>Data for Minors</h2>
		<p>We are designed for use by middle and high school students. We take additional precautions:</p>
		<ul>
			<li>Conversation content is encrypted at rest and in transit</li>
			<li>Parental consent is obtained through the family linking process</li>
			<li>Students maintain control over their data and can delete it at any time</li>
			<li>We comply with applicable data protection regulations including COPPA (US), GDPR-K (EU), and China's Personal Information Protection Law (PIPL)</li>
		</ul>
	</section>

	<section>
		<h2>Data Storage &amp; Security</h2>
		<ul>
			<li>All data is stored on <strong>Supabase</strong> (PostgreSQL) hosted in the United States</li>
			<li>Conversation content is encrypted using <strong>AES-256-GCM</strong> before storage</li>
			<li>All data transmission uses <strong>HTTPS/TLS 1.3</strong></li>
			<li>Row-Level Security (RLS) policies ensure users can only access their own data</li>
		</ul>
	</section>

	<section>
		<h2>Data Retention &amp; Deletion</h2>
		<ul>
			<li><strong>Free tier:</strong> Cloud metadata retained for 30 days</li>
			<li><strong>Paid tier:</strong> Unlimited retention</li>
			<li>Students can delete individual conversations or their entire account at any time</li>
			<li>Account deletion removes all associated data within <strong>24 hours</strong></li>
			<li>Parents can delete their own account, which unlinks all connected students</li>
		</ul>
		<p>To delete your data, use the "Delete Account" option in the extension settings, or contact us at the email below.</p>
	</section>

	<section>
		<h2>Your Rights</h2>
		<p>You have the right to:</p>
		<ul>
			<li><strong>Access</strong> your personal data</li>
			<li><strong>Correct</strong> inaccurate data</li>
			<li><strong>Delete</strong> your data at any time</li>
			<li><strong>Export</strong> your data in a portable format</li>
			<li><strong>Withdraw consent</strong> by uninstalling the extension</li>
		</ul>
	</section>

	<section>
		<h2>Changes to This Policy</h2>
		<p>We will notify users of material changes through the extension and update the "Last updated" date above. Continued use after changes constitutes acceptance.</p>
	</section>

	<section>
		<h2>Contact</h2>
		<p>For privacy questions or data requests:</p>
		<ul>
			<li><strong>Email:</strong> <a href="mailto:contact-us@punkgo.ai">contact-us@punkgo.ai</a></li>
		</ul>
	</section>

	<p class="closing"><em>AI Growth Archive is built by PunkGo. Our philosophy: record growth, not surveillance.</em></p>
</article>

<style>
	.privacy {
		max-width: 800px;
		margin: 0 auto;
		padding: 120px 24px 80px;
	}

	.divider {
		font-family: monospace;
		color: var(--text-dim);
		text-align: center;
		font-size: 0.8rem;
		margin-bottom: var(--space-md);
		opacity: 0.4;
		overflow: hidden;
	}

	.page-title {
		font-family: var(--font-pixel);
		font-size: clamp(12px, 2.5vw, 18px);
		color: var(--neon-green);
		text-shadow: 0 0 12px var(--pixel-shadow);
		margin-bottom: 4px;
	}

	.subtitle {
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--neon-blue);
		margin-bottom: 4px;
	}

	.updated {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--text-dim);
		margin-bottom: var(--space-lg);
	}

	section {
		margin-bottom: var(--space-lg);
	}

	h2 {
		font-family: var(--font-pixel);
		font-size: 11px;
		color: var(--neon-green);
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: var(--space-sm);
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(57, 255, 20, 0.15);
	}

	h3 {
		font-family: var(--font-pixel);
		font-size: 9px;
		color: var(--neon-blue);
		margin-bottom: 8px;
		margin-top: var(--space-md);
	}

	p {
		font-family: var(--font-readable);
		font-size: 1rem;
		color: var(--text-primary);
		line-height: 1.7;
		margin-bottom: var(--space-sm);
	}

	.zh {
		color: var(--text-dim);
		font-size: 0.95rem;
	}

	ul {
		font-family: var(--font-readable);
		font-size: 1rem;
		color: var(--text-primary);
		line-height: 1.7;
		padding-left: 20px;
		margin-bottom: var(--space-sm);
	}

	li {
		margin-bottom: 6px;
	}

	strong {
		color: var(--neon-yellow);
	}

	a {
		color: var(--neon-blue);
	}
	a:hover {
		color: var(--neon-green);
		text-shadow: 0 0 6px var(--pixel-shadow);
	}

	.table-wrap {
		overflow-x: auto;
		margin-bottom: var(--space-sm);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-family: var(--font-readable);
		font-size: 0.95rem;
	}

	th, td {
		text-align: left;
		padding: 10px 14px;
		border: 1px solid rgba(57, 255, 20, 0.15);
	}

	th {
		color: var(--neon-green);
		background: rgba(57, 255, 20, 0.05);
		font-family: var(--font-pixel);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	td {
		color: var(--text-primary);
	}

	.closing {
		color: var(--text-dim);
		font-style: italic;
		margin-top: var(--space-lg);
		padding-top: var(--space-md);
		border-top: 1px solid rgba(57, 255, 20, 0.15);
	}

	@media (max-width: 768px) {
		.privacy {
			padding: 100px 16px 60px;
		}
	}
</style>
