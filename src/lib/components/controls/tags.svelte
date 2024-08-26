<script lang="ts">
	import Tag from './tag.svelte';
	import Input from './input.svelte';

	import { TagHelper } from '$lib/core/helpers/tag.helper';

	import type { TTag } from '$lib/core/types/tag.type';

	/**
	 * @description
	 * The label of the toggle input
	 */
	export let label: string = 'New tag...';

	/**
	 * @description
	 * The inserted tags
	 */
	export let value: Array<TTag> = [];

	/**
	 * @description
	 * The tag text to create
	 */
	let newTagtext: string = '';

	/**
	 * @description
	 * Creates a new tag object
	 *
	 * @param name The name of the tag
	 */
	const createTag = (name: string): void => {
		const tag = TagHelper.create(name);
		value = [...value, tag];
	};

	/**
	 * @description
	 * Deletes a tag
	 */
	const deleteTag = (tag: TTag): void => {
		value = [...value.filter((e) => e.id !== tag.id)];
	};

	/**
	 * @description
	 * Clears the tag input
	 */
	const clearInput = (): void => {
		newTagtext = '';
	};

	/**
	 * @description
	 * Key up event
	 *
	 * @param e Event object
	 */
	const onKeyUp = (e: CustomEvent<string>): void => {
		switch (e.detail) {
			case ',':
			case ';':
			case 'enter': {
				newTagtext = newTagtext.replace(/[,;]/g, '');

				if (newTagtext.length > 0) {
					createTag(newTagtext);
					clearInput();
				}

				break;
			}
		}
	};

	/**
	 * @description
	 * Deletes a tag
	 */
	const onDelete = (e: CustomEvent<TTag>): void => {
		deleteTag(e.detail);
	};
</script>

<span class="tags">
	<div class="tags__input">
		<Input errorMsg={null} {label} bind:value={newTagtext} on:keyup={onKeyUp} />
	</div>

	<ul class="tags__list">
		{#each value as tag}
			<li class="tags__item">
				<Tag {tag} on:remove={onDelete} />
			</li>
		{/each}
	</ul>
</span>

<style lang="scss">
	.tags {
		$root: &;

		&__input {
			width: 100%;
		}

		&__list {
			padding: 0;
			margin: 4px 0 0 0;

			list-style-type: none;

			#{$root}__item {
				display: inline;
			}
		}
	}
</style>
