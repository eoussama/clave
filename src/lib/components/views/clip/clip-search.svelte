<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import Tip from '$lib/components/layout/tip.svelte';
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
	export let deleteBtn: boolean = false;

	/**
	 * @description
	 * The search term
	 */
	let searchTerm: string = '';

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
</script>

<div class="search">
	<div class="search__box">
		<input class="search__input" type="search" placeholder="Search..." value={searchTerm} />
		<div class="search__icon">
			<MdSearch />
		</div>
	</div>

	<div class="search__controls">
		{#if deleteBtn}
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
				flex: 1;
				padding: var(--spacing-padding);

				border: none;
				outline: none;

				color: var(--color-primary);
				background-color: transparent;

				font-size: 14px;
				font-weight: var(--font-weight-regular);
				font-family: var(--font-family-primary);

				&::placeholder {
					font-size: 12px;
					color: var(--color-primary);
					font-weight: var(--font-weight-light);
				}
			}
		}

		&__controls {
			margin: 0 6px;

			#{$root}__control {
				#{$root}__icon {
					cursor: pointer;

					transition-duration: 0.2s;
					transition-property: color;

					&:hover {
						color: rgba(var(--color-primary-rgb), 0.8);
					}
				}

				&:not(:last-of-type) {
					margin-right: 6px;
				}
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
