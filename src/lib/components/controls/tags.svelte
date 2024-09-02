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
	export let newTagtext: string = '';

	/**
	 * @description
	 * If the component is disabled
	 */
	export let disabled: boolean = false;

	/**
	 * @description
	 * If the component is readonly
	 */
	export let readonly: boolean = false;

	/**
	 * @description
	 * If the input is in error state
	 */
	let error: boolean = false;

	/**
	 * @description
	 * The error message
	 */
	let errorMsg: string = '';

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
					try {
						createTag(newTagtext);
						clearInput();

						errorMsg = '';
					} catch (err: any) {
						errorMsg = err.message;
					} finally {
						error = errorMsg.length > 0;
					}
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
	{#if !readonly}
		<div class="tags__input">
			<Input
				{label}
				{error}
				{errorMsg}
				{disabled}
				name="tags-input"
				on:keyup={onKeyUp}
				bind:value={newTagtext}
			/>
		</div>
	{:else}
		<h2 class="tags__label">{label}</h2>
	{/if}

	<ul class="tags__list">
		{#each value as tag}
			<li class="tags__item">
				<Tag {tag} {disabled} {readonly} on:remove={onDelete} />
			</li>
		{/each}
	</ul>
</span>

<style lang="scss">
	.tags {
		$root: &;

		--tags-label-color: hsl(var(--color-primary-hsl), 70%);

		&__input {
			width: 100%;
		}

		&__label {
			font-size: 14px;
			color: var(--tags-label-color);
			font-weight: var(--font-weight-light);
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
