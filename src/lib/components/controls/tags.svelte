<script lang="ts">
  import { v4 as uuid } from 'uuid';
	import type { TTag } from '$lib/core/types/tag.type';

	/**
	 * @description
	 * The label of the toggle input
	 */
	export let placeholder: string = 'New tag...';

	/**
	 * @description
	 * The inserted tags
	 */
	export let value: Array<TTag> = [];

	/**
	 * @description
	 * The tag name to create
	 */
	let newTagName: string = '';

	/**
	 * @description
	 * Creates a new tag object
	 *
	 * @param name The name of the tag
	 */
	const createTag = (name: string): void => {
		if (name.length > 0) {
			const tag = { id: uuid(), name };
			value = [...value, tag];
		}
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
	 * Deletes the latest inserted tag
	 */
	const deleteLastTag = (): void => {
		if (value.length > 0) {
			value.pop();
			value = [...value];
		}
	};

	/**
	 * @description
	 * Clears the tag input
	 */
	const clearInput = (): void => {
		newTagName = '';
	};

	const onKeyUp = (e: KeyboardEvent) => {
		switch (e.code.toLowerCase()) {
			case 'backspace': {
				if (newTagName.length === 0) {
					deleteLastTag();
				}

				break;
			}
			case 'keym':
			case 'keym': {
				if (newTagName) {
					createTag(newTagName.substring(0, newTagName.length - 1));
					clearInput();
				}

				break;
			}
		}
	};
</script>

<ul class="tags">
	{#each value as tag}
		<li class="tag-item">
			<button class="tag" type="button" on:click={() => deleteTag(tag)}>{tag.name}</button>
		</li>
	{/each}

	<li class="tag-item">
		<input
			class="tag-input"
			type="text"
			{placeholder}
			bind:value={newTagName}
			on:keyup|preventDefault={onKeyUp}
		/>
	</li>
</ul>

<style lang="scss">
	.tags {
		margin: 0;
		padding: 0;
		list-style-type: none;

		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

		.tag {
			cursor: pointer;
			padding: 2px 6px;
			font-size: 12px;
			border-radius: 10px;
			border: 1px solid grey;

			&:hover {
				background-color: rgb(255, 117, 117);
			}

			&-item {
				&:not(:first-of-type) {
					margin-left: 10px;
				}
			}
		}
	}
</style>
