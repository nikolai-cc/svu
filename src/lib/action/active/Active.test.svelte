<script lang="ts">
	import { active } from './active';
	import { page } from '$app/stores';

	console.log($page.url.href);
	console.log(document.location.href);
</script>

<nav>
	<a href="/" use:active>Active</a>
	<a href="/inactive" use:active>Inactive</a>
</nav>
