<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';

	import Tags from '../controls/tags.svelte';
	import Toggle from '../controls/toggle.svelte';

	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';

	import { ClipHelper } from '$lib/core/helpers/clip.helper';

	import type { TTag } from '$lib/core/types/tag.type';
	import type { TClip } from '$lib/core/types/clip.type';
	import type { TNullable } from '$lib/core/types/nullable.type';

	import { Interaction } from '$lib/core/enums/interaction.enum';

	export let send: any;
	export let receive: any;
	export let mode: Interaction;
	export let clip: TNullable<TClip>;

	let title: string = '';
	let content: string = '';
	let tags: Array<TTag> = [];
	let sensitive: boolean = false;

	const dispatcher = createEventDispatcher();

	const getModalTitle = () => {
		let modalTitle: string;

		switch (mode) {
			case Interaction.Creation: {
				modalTitle = 'Create clip';
				break;
			}

			case Interaction.Update: {
				modalTitle = 'Update clip';
				break;
			}

			default: {
				modalTitle = 'Clip detail';
			}
		}

		return modalTitle;
	};

	const onClose = () => {
		dispatcher('close');
	};

	const onValidate = async () => {
		const validatedClip: Partial<TClip> = {
			tags,
			title,
			content,
			sensitive,
			id: mode === Interaction.Update ? clip?.id : undefined
		};

		try {
			if (mode === Interaction.Creation) {
				await ClipHelper.create(validatedClip);
			} else {
				await ClipHelper.update(validatedClip as TClip);
			}
		} finally {
			onClose();
		}
	};

	$: readonly = mode === Interaction.View;

	onMount(() => {
		if (Interaction.Update) {
			tags = clip?.tags ?? tags;
			title = clip?.title ?? title;
			content = clip?.content ?? content;
			sensitive = clip?.sensitive ?? sensitive;
		}
	});
</script>

<div class="modal">
	<div
		class="modal__box"
		out:send={{ key: 'clipflip', duration: 400 }}
		in:receive={{ key: 'clipflip', duration: 400 }}
	>
		<form class="modal__wrapper" on:submit|preventDefault={onValidate}>
			<div class="modal__head">
				<h3 class="modal__title">{getModalTitle()}</h3>

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
				<input
					type="text"
					name="title"
					placeholder="Optional title..."
					class="modal__input modal__input--title"
					bind:value={title}
				/>

				<textarea
					required
					name="content"
					bind:value={content}
					class="modal__input modal__input--content"
					placeholder="Enter the content to save..."
				></textarea>

				<Toggle label="Sensitive" bind:value={sensitive} />
				<Tags placeholder="Tags" bind:value={tags} />
			</div>

			{#if !readonly}
				<div class="modal__controls">
					<button class="modal__control modal__control--add" type="submit">
						<div class="modal__icon">
							<MdCheck />
						</div>
					</button>
				</div>
			{/if}
		</form>
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

			#{$root}__wrapper {
				display: contents;

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
		}
	}
</style>
