<article>
	<div class="container flow">
		<slot />
	</div>
</article>

<style>
	.container {
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}
	article {
		max-height: 100vh;
		padding-left: 2rem;
		padding-right: 2rem;
		padding-top: 3rem;
		padding-bottom: 3rem;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
