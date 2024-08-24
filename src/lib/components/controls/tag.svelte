<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MdRemove from 'svelte-icons/md/MdRemove.svelte';

	import type { TTag } from '$lib/core/types/tag.type';

	// TODO: disabled
	// TODO: readonly

	/**
	 * @description
	 * Event dispatcher
	 */
	const dispatch = createEventDispatcher();

	/**
	 * @description
	 * The tag info
	 */
	export let tag: TTag;

	/**
	 * @description
	 * If the tag is disabled
	 */
	export let disabled: boolean = false;

	/**
	 * @description
	 * If the tag is readonly
	 */
	export let readonly: boolean = false;

	/**
	 * @description
	 * Click handler
	 */
	const onClick = () => {
		if (!disabled && !readonly) {
			dispatch('remove', { tag });
		}
	};
</script>

<button
	class="tag"
	class:tag--disabled={disabled}
	class:tag--readonly={readonly}
	disabled={disabled || readonly}
	on:click={onClick}
>
	<span class="tag__text">
		{tag.text}
	</span>

	{#if !readonly && !disabled}
		<span class="tag__remove">
			<MdRemove />
		</span>
	{/if}
</button>

<style lang="scss">
	.tag {
		$root: &;

		--tag-bg-color: transparent;
		--tag-text-color: hsl(var(--color-primary-hsl), 70%);
		--tag-border-color: hsl(var(--color-primary-hsl), 80%);

		cursor: pointer;

		height: 20px;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		padding: 2px 6px;
		border-radius: 10px;

		color: var(--tag-text-color);
		background-color: var(--tag-bg-color);
		border: 1px solid var(--tag-border-color);

		transition-duration: 0.2s;
		transition-property: background-color border-color color;

		&__text {
			font-size: 10px;
			font-weight: var(--font-weight-light);
		}

		&__remove {
			width: 100%;
			height: 100%;

			display: flex;

			margin-left: 4px;
		}

		&--disabled {
			--tag-bg-color: transparent;
			--tag-text-color: #b9b9b9;
			--tag-border-color: #eeeeee;

			cursor: not-allowed;
		}

		&--readonly {
			cursor: default;
		}

		&:hover:not(:disabled) {
			--tag-bg-color: hsl(var(--color-failure-hsl), 96%);
			--tag-text-color: hsl(var(--color-failure-hsl), 70%);
			--tag-border-color: hsl(var(--color-failure-hsl), 80%);
		}
	}
</style>
