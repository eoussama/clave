<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import Tip from '$lib/components/layout/tip.svelte';
	import Check from '$lib/components/controls/check.svelte';
	import Button from '$lib/components/controls/button.svelte';

	import MdSearch from 'svelte-icons/md/MdSearch.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';

	import { ButtonSize } from '$lib/core/enums/button-size.enum';
	import { ButtonStyle } from '$lib/core/enums/button-style.enum';
	import { TipPositiion } from '$lib/core/enums/tip-position.enum';

	/**
	 * @description
	 * If the search box has a deletion button
	 */
	export let deleteCtrl: boolean = false;

	/**
	 * @description
	 * If the search box has a checkbox
	 */
	export let checkCtrl: boolean = false;

	/**
	 * @description
	 * The search term
	 */
	let searchTerm: string = '';

	/**
	 * @decription
	 * If the selected clips are checked
	 */
	let value: boolean = false;

	/**
	 * @description
	 * Event dispatcher
	 */
	const dispatch = createEventDispatcher();

	/**
	 * @description
	 * Deletes the selected clips
	 */
	const onDelete = () => {
		dispatch('delete');
	};

	/**
	 * @description
	 * Checks the selected clips
	 */
	const onCheck = () => {
		dispatch('check', value);
	};

	/**
	 * @description
	 * Searches for clips
	 *
	 * @param e Event object
	 */
	const onSearch = (_: CustomEvent<string>) => {
		dispatch('search', searchTerm);
	};
</script>

<div class="search">
	<div class="search__controls search__controls--left">
		{#if checkCtrl}
			<div class="search__control search__control--check" transition:fly={{ x: -5, duration: 200 }}>
				<Tip message="Select all clips" position={TipPositiion.Right}>
					<Check ripple bind:value on:check={onCheck} />
				</Tip>
			</div>
		{/if}
	</div>

	<div class="search__box">
		<input
			class="search__input"
			type="search"
			placeholder="Search..."
			value={searchTerm}
			on:input={onSearch}
		/>
		<div class="search__icon">
			<MdSearch />
		</div>
	</div>

	<div class="search__controls search__controls--right">
		{#if deleteCtrl}
			<div class="search__control search__control--delete" transition:fly={{ x: 5, duration: 200 }}>
				<Tip message="Delete the selected clips" position={TipPositiion.Left}>
					<Button
						shine
						ripple
						icon={MdDelete}
						size={ButtonSize.Small}
						style={ButtonStyle.Failure}
						on:click={onDelete}
					/>
				</Tip>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.search {
		$root: &;

		display: flex;
		flex-direction: row;
		align-items: center;
		align-items: stretch;
		justify-content: center;

		border: 2px solid transparent;
		background-color: transparent;

		transition-duration: 0.2s;
		transition-property: border-color;

		background-color: hsl(var(--color-primary-hsl), 95%);

		&__box {
			flex: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			#{$root}__input {
				outline-offset: -2px;
				appearance: textfield;

				flex: 1;
				padding: 10px 8px;

				border: none;
				outline: none;

				color: var(--color-primary);
				background-color: transparent;

				font-size: 14px;
				font-weight: var(--font-weight-regular);
				font-family: var(--font-family-primary);

				&::-webkit-search-decoration,
				&::-webkit-search-cancel-button {
					appearance: none;
				}

				&::placeholder {
					font-size: 12px;
					color: var(--color-primary);
					font-weight: var(--font-weight-light);
				}
			}
		}

		&__controls {
			display: flex;
			align-items: stretch;

			&--right {
				margin-right: 6px;
			}

			#{$root}__control {
				margin-left: 6px;

				display: flex;
				align-items: center;
			}
		}

		&__icon {
			width: 22px;
			height: 22px;

			color: rgba(var(--color-primary-rgb), 0.4);
		}

		&:focus-within {
			border-color: rgba(var(--color-primary-rgb), 0.2);
		}
	}
</style>
