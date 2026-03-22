<svelte:head>
	<title>Privacy Policy — PunkGo Roast</title>
	<meta name="description" content="Privacy policy for the PunkGo Roast Chrome extension." />
	<style>
		@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
	</style>
</svelte:head>

<article class="privacy">
	<h1>Privacy Policy</h1>
	<p class="subtitle">PunkGo Roast — Chrome Extension</p>
	<p class="updated">Last updated: 2026-03-22</p>

	<!-- ─── English ──────────────────────────────────────────── -->

	<section>
		<h2>1. What PunkGo Roast Does</h2>
		<p>
			PunkGo Roast analyzes your AI chat usage patterns (message counts, session days,
			interaction style) to assign you a dog-breed personality type based on MBTI.
			It generates a shareable card with your result.
		</p>
	</section>

	<section>
		<h2>2. Local Analysis</h2>
		<p>
			All chat content analysis happens <strong>locally in your browser</strong>.
			The extension reads chat data from supported platforms (ChatGPT, DeepSeek, Kimi, Doubao)
			using your existing browser session. <strong>No conversation text or message content
			is ever transmitted to any external server.</strong>
		</p>
		<p>
			Platform API tokens are cached in memory only (5-minute TTL) and are never persisted
			to disk or sent to our servers.
		</p>
	</section>

	<section>
		<h2>3. Data We Transmit</h2>
		<p>
			When you use the Share feature or interact with the extension, the following data
			is sent to our first-party API at <code>n78.xyz</code>:
		</p>

		<h3>3.1 Share (POST /api/v1/roast/share)</h3>
		<ul>
			<li>Personality result: personality ID, personality name, MBTI type</li>
			<li>Card display data: color scheme, quip text, catchphrase</li>
			<li>Radar chart values: 6 dimensions, each a score from 0-100</li>
			<li>Aggregate stats: total message count, analysis period (days)</li>
			<li>Platform identifier (chatgpt / deepseek / kimi / doubao / mixed)</li>
			<li>Locale (language setting)</li>
			<li>Dog image URL (pointing to Supabase CDN)</li>
		</ul>

		<h3>3.2 Anonymous Analytics (POST /api/v1/roast/visit)</h3>
		<ul>
			<li>A random UUID (<code>installId</code>) generated at install time — not linked to any account</li>
			<li>Personality ID, platform, locale</li>
			<li>Action type (save or share)</li>
		</ul>

		<h3>3.3 Config Check (GET /api/v1/roast/config)</h3>
		<ul>
			<li>Version number only. No user data is sent.</li>
		</ul>
	</section>

	<section>
		<h2>4. Local Storage</h2>
		<p>The extension uses Chrome's storage APIs:</p>
		<ul>
			<li><strong>chrome.storage.local:</strong> config cache, installId (random UUID), last roast result (fallback display)</li>
			<li><strong>chrome.storage.session:</strong> in-progress analysis state for crash recovery — automatically cleared when the browser session ends</li>
		</ul>
	</section>

	<section>
		<h2>5. Third-Party Services</h2>
		<table>
			<thead>
				<tr>
					<th>Service</th>
					<th>Purpose</th>
					<th>Data Exposed</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Supabase CDN<br /><code>xwanbbxcfhbysnqxnscp.supabase.co</code></td>
					<td>Hosts dog breed images and card assets</td>
					<td>Your IP address (standard CDN request)</td>
				</tr>
				<tr>
					<td>n78.xyz (PunkGo API)<br /><code>n78.xyz</code></td>
					<td>Share cards, config check, anonymous analytics</td>
					<td>Personality result, radar scores, aggregate stats, random install UUID</td>
				</tr>
			</tbody>
		</table>
	</section>

	<section>
		<h2>6. What We Do NOT Collect</h2>
		<ul class="no-collect">
			<li>Conversation text or message content</li>
			<li>Email addresses, usernames, or account IDs</li>
			<li>Browsing history or installed extensions</li>
			<li>Precise geolocation</li>
			<li>Cookies (the extension sets none)</li>
			<li>Any data from pages other than supported AI chat platforms</li>
		</ul>
	</section>

	<section>
		<h2>7. Data Retention</h2>
		<p>
			Shared cards are stored indefinitely so share links remain functional.
			Anonymous visit events are retained for aggregate analytics and may be purged
			after 12 months. You can request deletion of your shared cards by contacting us
			with the share URL.
		</p>
	</section>

	<section>
		<h2>8. Data Security</h2>
		<p>
			All network communication uses HTTPS. The API server is access-controlled
			and does not expose user data publicly. Shared cards are accessible only
			via their unique, unguessable IDs.
		</p>
	</section>

	<section>
		<h2>9. Children's Privacy</h2>
		<p>
			PunkGo Roast is not directed at children under 13. We do not knowingly
			collect data from children.
		</p>
	</section>

	<section>
		<h2>10. Changes to This Policy</h2>
		<p>
			We may update this policy as the extension evolves. Material changes will be
			noted with an updated date at the top of this page. Continued use of the
			extension after changes constitutes acceptance.
		</p>
	</section>

	<section>
		<h2>11. Contact</h2>
		<p>
			Questions or deletion requests: <a href="mailto:contact-us@punkgo.ai">contact-us@punkgo.ai</a>
		</p>
	</section>

	<!-- ─── Chinese ──────────────────────────────────────────── -->

	<hr class="lang-divider" />

	<section class="zh">
		<h2>隐私政策 (中文)</h2>
		<p class="updated">最后更新: 2026-03-22</p>

		<h3>数据处理概要</h3>
		<p>
			PunkGo Roast 是一款 Chrome 扩展，通过分析你的 AI 聊天使用模式（消息数量、使用天数、交互风格）
			来为你匹配一个基于 MBTI 的犬种人格类型。
		</p>

		<h3>本地分析</h3>
		<p>
			所有聊天内容分析<strong>完全在浏览器本地完成</strong>。
			扩展通过你现有的浏览器会话读取聊天数据。
			<strong>任何对话文本或消息内容都不会被发送到外部服务器。</strong>
		</p>
		<p>
			平台 API token 仅缓存在内存中（5分钟过期），不会持久化存储或发送至我们的服务器。
		</p>

		<h3>传输的数据</h3>
		<p>当你使用分享功能时，以下数据会被发送到我们的 API (<code>n78.xyz</code>):</p>
		<ul>
			<li>人格结果：人格 ID、名称、MBTI 类型</li>
			<li>卡片展示数据：配色、金句、标语</li>
			<li>雷达图数值：6个维度，每个 0-100 分</li>
			<li>聚合统计：消息总数、分析天数</li>
			<li>平台标识、语言设置</li>
			<li>匿名 UUID（安装时随机生成，不关联任何账号）</li>
		</ul>

		<h3>不收集的数据</h3>
		<ul class="no-collect">
			<li>对话文本或消息内容</li>
			<li>邮箱、用户名或账号 ID</li>
			<li>浏览历史或已安装的扩展</li>
			<li>精确地理位置</li>
			<li>Cookie（扩展不设置任何 Cookie）</li>
		</ul>

		<h3>联系方式</h3>
		<p>
			如有疑问或删除请求: <a href="mailto:contact-us@punkgo.ai">contact-us@punkgo.ai</a>
		</p>
	</section>
</article>

<style>
	.privacy {
		max-width: 720px;
		margin: 0 auto;
		padding: 80px 24px 120px;
		font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
		color: #e0e0e0;
		line-height: 1.7;
	}

	h1 {
		font-family: 'DM Sans', system-ui, sans-serif;
		font-size: 2rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 4px;
	}

	.subtitle {
		font-size: 1rem;
		color: #39ff14;
		margin-bottom: 4px;
	}

	.updated {
		font-size: 0.85rem;
		color: #666;
		margin-bottom: 40px;
	}

	h2 {
		font-family: 'DM Sans', system-ui, sans-serif;
		font-size: 1.25rem;
		font-weight: 700;
		color: #ffffff;
		margin-top: 40px;
		margin-bottom: 12px;
		padding-bottom: 6px;
		border-bottom: 1px solid #222;
	}

	h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #ccc;
		margin-top: 20px;
		margin-bottom: 8px;
	}

	section {
		padding: 0;
		max-width: none;
	}

	p {
		margin-bottom: 12px;
		font-size: 0.95rem;
	}

	ul {
		margin: 8px 0 16px 20px;
		font-size: 0.95rem;
	}

	li {
		margin-bottom: 6px;
	}

	ul.no-collect li::marker {
		content: '\2717  ';
		color: #ff2d95;
	}

	code {
		background: #1a1a2e;
		padding: 2px 6px;
		border-radius: 3px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85rem;
		color: #39ff14;
	}

	a {
		color: #00d4ff;
		text-decoration: none;
	}

	a:hover {
		color: #ff2d95;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: 12px 0 16px;
		font-size: 0.9rem;
	}

	th, td {
		text-align: left;
		padding: 10px 12px;
		border: 1px solid #222;
	}

	th {
		background: #1a1a2e;
		color: #39ff14;
		font-weight: 600;
	}

	td {
		background: transparent;
	}

	.lang-divider {
		border: none;
		border-top: 1px solid #333;
		margin: 60px 0 40px;
	}

	.zh h2 {
		color: #39ff14;
	}

	.zh .updated {
		margin-bottom: 24px;
	}

	strong {
		color: #ffffff;
		font-weight: 600;
	}

	@media (max-width: 600px) {
		.privacy {
			padding: 60px 16px 80px;
		}

		h1 {
			font-size: 1.5rem;
		}

		table {
			font-size: 0.8rem;
		}

		th, td {
			padding: 8px;
		}
	}
</style>
