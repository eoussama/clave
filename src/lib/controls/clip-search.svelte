<script type="ts">
	import MdSearch from 'svelte-icons/md/MdSearch.svelte';
	import MdFilterList from 'svelte-icons/md/MdFilterList.svelte';
</script>

<div class="search">
	<div class="search__box">
		<input class="search__input" type="search" placeholder="Search..." />
		<div class="search__icon">
			<MdSearch />
		</div>
	</div>

	<div class="search__controls">
		<div class="search__control search__control--filter">
			<div class="search__icon">
				<MdFilterList />
			</div>
		</div>
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

		&__box {
			flex: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			#{$root}__input {
				flex: 1;
				padding: 10px;

				border: none;
				outline: none;
				background-color: transparent;

				&::placeholder {
					font-size: 12px;
					font-weight: var(--font-weight-light);
					font-family: var(--font-family-primary);
				}
			}
		}

		&__controls {
			margin: 0 6px 0 3px;

			#{$root}__control {
				#{$root}__icon {
					opacity: 0.5;
					cursor: pointer;

					transition-duration: 0.2s;
					transition-property: opacity;

					&:hover {
						opacity: 1;
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

			opacity: 0.6;
			color: rgb(192, 192, 192);
		}

		&:focus-within {
			border-color: rgba(128, 128, 128, 0.116);
		}
	}
</style>
