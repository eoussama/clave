<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { AuthHelper } from '$lib/core/helpers/auth.felper';

	export let send: any;
	export let receive: any;

	const dispatcher = createEventDispatcher();

	const onClose = () => {
		dispatcher('close');
	};
</script>

<div class="modal">
	<div
		class="modal__box"
		out:send={{ key: 'clipflip', duration: 400 }}
		in:receive={{ key: 'clipflip', duration: 400 }}
	>
		<div class="modal__head">
			<h3 class="modal__title">Create Clip</h3>

			<button
				class="modal__control modal__control--close"
				on:click={onClose}
				in:fade={{ duration: 200 }}
			>
				<div class="modal__icon">
					<MdClose />
				</div>
			</button>
		</div>

		<div class="modal__inputs">
			<input class="modal__input modal__input--title" type="text" placeholder="Optional title..." />

			<textarea
				class="modal__input modal__input--content"
				placeholder="Enter the content to save..."
			></textarea>
		</div>

		<div class="modal__controls">
			<button class="modal__control modal__control--add">
				<div class="modal__icon">
					<MdAdd />
				</div>
			</button>
		</div>
	</div>

	<ul class="modal__tags"></ul>
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

		&__box {
			$spacing: 16px;

			overflow: hidden;
			background-color: hsl(var(--color-primary-hsl), 95%);

			border-radius: 6px;
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);

			display: flex;
			flex-direction: column;

			width: 100%;
			min-height: 400px;

			#{$root}__head {
				padding: $spacing $spacing 0 $spacing;

				display: flex;
				flex-direction: row;

				#{$root}__title {
					font-size: 16px;
					font-weight: var(--font-weight-bold);
					color: hsl(var(--color-primary-hsl), 45%);
				}

				#{$root}__control {
					&--close {
						margin-left: auto;
						color: hsl(var(--color-primary-hsl), 60%);

						transition-duration: 0.2s;
						transition-property: color;

						&:hover {
							color: hsl(var(--color-primary-hsl), 50%);
						}
					}
				}
			}

			#{$root}__inputs {
				flex: 1;
				display: flex;
				flex-direction: column;

				padding: $spacing;

				#{$root}__input {
					border: none;
					outline: none;

					width: 100%;
					height: 100%;
					padding: 12px;

					font-size: 14px;
					font-weight: var(--font-weight-regular);
					font-family: var(--font-family-primary);

					border-radius: 4px;
					background: linear-gradient(
						to right bottom,
						hsl(var(--color-primary-hsl), 90%),
						hsl(var(--color-primary-hsl), 86%)
					);

					&::placeholder {
						font-size: 12px;
					}

					&--title {
						margin-bottom: $spacing;
					}

					&--content {
						flex: 1;
						resize: none;
					}
				}
			}

			#{$root}__controls {
				display: flex;
				align-items: center;

				padding: 6px;

				background-color: rgba(var(--color-primary-rgb), 0.15);

				#{$root}__control {
					padding: 6px;
					margin-left: auto;

					border-radius: 4px;
					background-color: rgba(var(--color-primary-rgb), 0.6);

					transition-duration: 0.2s;
					transition-property: background-color;

					&:hover {
						background-color: var(--color-primary);
					}

					#{$root}__icon {
						color: hsl(var(--color-secondary-hsl), 86%);
					}
				}
			}

			#{$root}__control {
				all: unset;
				cursor: pointer;

				#{$root}__icon {
					width: 24px;
					height: 24px;
				}
			}
		}

		&__tags {
			margin: 0;
			padding: 0;
			list-style-type: none;
		}
	}
</style>
