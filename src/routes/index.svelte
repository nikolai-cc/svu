<script>
	import Article from '$docs/Article.svelte';
	import OnMount from '$lib/components/OnMount.svelte';
	import { typewriter } from '$lib/transition';

	const cini = { delay: 500, speed: 150 };
	const cin = { speed: 150 };
	const cout = { speed: 50 };
</script>

<Article>
	<h1>
		<code>
			<span>/s</span><OnMount
				><span id="t" in:typewriter={cini} out:typewriter={cout}>vu</span></OnMount
			>
		</code>
	</h1>

	<p>
		Svutil is a collection of Svelte(Kit) utillities that make developing webapps even more easy and
		fun.
	</p>

	<p class="links">
		<a href="/why">Why svutil</a> |
		<a href="/quickstart">Getting Started</a> |
		<a href="/changelog">Changelog</a>
	</p>

	<h3>Status</h3>

	<p>
		Svutil started out as a collection of Svelte stuff I often use. Svutil is currently in alpha,
		while the API settles.
	</p>

	<p>
		Feel free to take it for a test drive! Be aware that some svutils are not fully production
		ready, and the API may change in the near future.
	</p>

	<p>
		If you run into any issues, or have any questions or suggestions, feel free to open an issue on
		GitHub.
	</p>

	<h3>Features</h3>

	<p>Check out the various parts of the docs:</p>

	<ul>
		<li>
			<p>
				<a href="/docs/action"><code>/action</code></a>
			</p>
			<p>A huge collection of svelte:actions.</p>
		</li>
		<li>
			<p>
				<a href="/docs/app"><code>/app</code></a>
			</p>
			<p>App related utilities.</p>
		</li>
		<li>
			<p>
				<a href="/docs/client"><code>/client</code></a>
			</p>
			<p>Client related stores and utils.</p>
		</li>
		<li>
			<p>
				<a href="/docs/components"><code>/components</code></a>
			</p>
			<p>Useful components.</p>
		</li>
		<li>
			<p>
				<a href="/docs/store"><code>/store</code></a>
			</p>
			<p>Custom stores.</p>
		</li>
		<li>
			<p>
				<a href="/docs/transition"><code>/transition</code></a>
			</p>
			<p>Custom transition functions.</p>
		</li>
	</ul>
</Article>

<style>
	.links a {
		color: var(--light);
	}
	#t::after {
		content: '|';
		color: var(--bg4);
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0% {
			opacity: 0;
		}
		1% {
			opacity: 1;
		}
		50% {
			opacity: 1;
		}
		51% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
</style>
