<script lang="ts">
	import { clickoutside } from '$lib/action/clickoutside';

	let where = 'inside';
</script>

<div data-testid="outside">outside</div>
<div data-where={where} use:clickoutside={() => (where = 'outside')} data-testid="foo">foo</div>
