<script lang="ts">
	import { onMount } from 'svelte';

	import { v4 as uuid } from 'uuid';

	import type { TTag } from '$lib/core/types/tag.type';

	// TODO: default
	// TODO: disabled
	// TODO: readonly

	/**
	 * @description
	 * The tag info
	 */
	export let tag: TTag;

	onMount(() => {
		if (!tag.id) {
			tag.id = uuid();
		}
	});
</script>

<span class="tag">
	{tag.text}
</span>

<style lang="scss">
	.tag {
	}
</style>
