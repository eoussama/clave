<script lang="ts">
	import type { TClip } from '../../core/types/clip.type';
	import ClipItem from './clip-item.svelte';

	const clips: Array<TClip> = [
		{
			id: 'a',
			content: 'lorem',
			title: 'pri clip',
			sensitive: false,
			tags: []
		},
		{
			id: 'f',
			content: 'd399vv@ff',
			title: 'fb pass',
			sensitive: true,
			tags: [{ name: 'acc' }]
		},
		{
			id: 't',
			content: '03169679',
			title: 'acc id',
			sensitive: false,
			tags: [{ name: 'iam' }]
		}
	];
</script>

<div class="clips">
	<ul class="clips-list">
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
			margin: 0;
			padding: 0;
			list-style-type: none;

      border-radius: 5px;
			border: 1px solid whitesmoke;

			#{$root}-item:not(:last-of-type) {
				border-bottom: 1px solid whitesmoke;
			}
		}
	}
</style>
