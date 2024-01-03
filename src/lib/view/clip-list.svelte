<script lang="ts">
	import ClipSearch from '$lib/controls/clip-search.svelte';
	import ClipItem from './clip-item.svelte';
	import type { TClip } from '../../core/types/clip.type';

	const MAX_DATA = 10;
	const clips: Array<TClip> = new Array(MAX_DATA).fill(null).map((e) => ({
		id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(10 + 26),
		content: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(10 + 26),
		title: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(10 + 26),
		sensitive: Boolean(Math.floor(Math.random() + 0.5)),
		tags: []
	}));
</script>

<div class="clips">
	<ul class="clips-list">
		<li class="clips-item">
			<ClipSearch />
		</li>

		{#each clips as clip}
			<li class="clips-item">
				<ClipItem {clip} />
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.clips {
		$root: &;

		&-list {
			$border-color: hsl(var(--color-primary-hsl), 95%);

			margin: 0;
			padding: 0;
			list-style-type: none;

			border-radius: 5px;
			border: 1px solid $border-color;

			#{$root}-item:not(:last-of-type) {
				border-bottom: 1px solid $border-color;
			}
		}
	}
</style>
