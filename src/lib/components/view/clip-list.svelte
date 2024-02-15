<script lang="ts">
	import ClipItem from './clip-item.svelte';
	import { slide } from 'svelte/transition';
	import ClipSearch from '$lib/components/controls/clip-search.svelte';
	import type { TClip } from '$lib/core/types/clip.type';

	export let unfocused: boolean;

	const MAX_DATA = 13;
	const clips: Array<TClip> = new Array(MAX_DATA).fill(null).map((e) => ({
		id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(10 + 26),
		content: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(10 + 26),
		title: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(10 + 26),
		sensitive: Boolean(Math.floor(Math.random() + 0.5)),
		tags: []
	}));

	let searchTerm: string;

	$: filteredClips = clips.filter(
		(e) =>
			searchTerm?.toLowerCase().includes(e.title.toLowerCase()) ||
			e.title.toLowerCase().includes(searchTerm?.toLowerCase())
	);
</script>

<div class="clips">
	<ul class="clips-list">
		<li class="clips-item clips-item--search" class:clips-item--unfocused={unfocused}>
			<ClipSearch bind:searchTerm />
		</li>

		<div class="clips-items">
			{#each filteredClips as clip}
				<li class="clips-item" class:clips-item--unfocused={unfocused} in:slide out:slide>
					<ClipItem {clip} />
				</li>
			{/each}
		</div>
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

			#{$root}-items {
				width: 100%;
				height: 100%;

				overflow: auto;
				max-height: 400px;
			}

			#{$root}-item {
				&--search {
					top: 0;
					position: sticky;

					background-color: hsl(var(--color-primary-hsl), 97%);
				}

				&--unfocused {
					z-index: -1;
				}

				&:not(:last-of-type) {
					border-bottom: 1px solid $border-color;
				}
			}
		}
	}
</style>
