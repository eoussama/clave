<script lang="ts">
	import { fade } from 'svelte/transition';

	import Tip from '$lib/components/layout/tip.svelte';
	import Button from '$lib/components/controls/button.svelte';

	import MdClose from 'svelte-icons/md/MdClose.svelte';

	import { TipPositiion } from '$lib/core/enums/tip-position.enum';
	import { ButtonSize } from '$lib/core/enums/button-size.enum';
	import { ButtonStyle } from '$lib/core/enums/button-style.enum';
	import { ButtonColor } from '$lib/core/enums/button-color.enum';

	// TODO: body
	// TODO: state

	/**
	 * @description
	 * The title of the modal
	 */
	export let title: string;

	/**
	 * @description
	 * Closes the modal
	 */
	const onClose = () => {
		console.log('TODO: close');
	};
</script>

<div class="modal">
	<div class="modal__element">
		<div class="modal__head">
			<h3 class="modal__title">{title}</h3>

			<div class="modal__controls">
				<div class="modal__control modal__control--close" in:fade={{ duration: 200 }}>
					<Tip message="Close" position={TipPositiion.Top}>
						<Button
							ripple
							icon={MdClose}
							size={ButtonSize.Small}
							style={ButtonStyle.Fill}
							color={ButtonColor.Primary}
							on:click={onClose}
						/>
					</Tip>
				</div>
			</div>
		</div>

		<div class="modal__body"></div>
	</div>
</div>

<style lang="scss">
	.modal {
		$root: &;

		z-index: 10;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 85%;
		height: 100%;

		margin: auto;
		max-width: 350px;

		&__element {
			$spacing: 16px;

			border-radius: 6px;
			background-color: #ffffff;
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);

			display: flex;
			flex-direction: column;

			width: 100%;
			height: auto;

			#{$root}__head {
				padding: $spacing $spacing 0 $spacing;

				display: flex;
				flex-direction: row;
				align-items: center;

				#{$root}__title {
					font-size: 16px;
					text-transform: capitalize;
					font-weight: var(--font-weight-bold);

					color: var(--color-primary);
				}

				#{$root}__controls {
					margin-left: auto;

					display: flex;
					align-items: center;
					justify-content: center;

					#{$root}__control {
						margin-left: 4px;
						display: inline-block;

						&--hide {
							display: none;
						}
					}
				}
			}
		}
	}
</style>
