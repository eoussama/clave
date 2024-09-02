<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';

	import Tags from '../controls/tags.svelte';
	import Input from '../controls/input.svelte';
	import Button from '../controls/button.svelte';
	import Toggle from '../controls/toggle.svelte';

	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import MdNotInterested from 'svelte-icons/md/MdNotInterested.svelte';

	import { ClipHelper } from '$lib/core/helpers/clip.helper';

	import type { TTag } from '$lib/core/types/tag.type';
	import type { TClip } from '$lib/core/types/clip.type';
	import type { TNullable } from '$lib/core/types/nullable.type';
	import type { TClipForm } from '$lib/core/types/clip-form.type';

	import { Interaction } from '$lib/core/enums/interaction.enum';
	import { ButtonSize } from '$lib/core/enums/button-size.enum';
	import { ButtonStyle } from '$lib/core/enums/button-style.enum';
	import { InputType } from '$lib/core/enums/input-type.enum';

	/**
	 * @description
	 * The send transition
	 */
	export let send: any;

	/**
	 * @description
	 * The receive transition
	 */
	export let receive: any;

	/**
	 * @description
	 * The interaction mode
	 */
	export let mode: Interaction;

	/**
	 * @description
	 * The clip to edit
	 */
	export let clip: TNullable<TClip>;

	/**
	 * @decription
	 * The clip form
	 */
	let form: TClipForm;

	/**
	 * @description
	 * Event dispatcher
	 */
	const dispatcher = createEventDispatcher();

	/**
	 * @description
	 * Gets the modal title
	 */
	const getModalTitle = (): string => {
		switch (mode) {
			case Interaction.Creation: {
				return 'Create Clip';
			}

			case Interaction.Update: {
				return 'Update Clip';
			}

			default: {
				return 'Clip Detail';
			}
		}
	};

	/**
	 * @description
	 * Gets the modal action
	 */
	const getModalAction = (): string => {
		switch (mode) {
			case Interaction.Creation: {
				return 'Create';
			}

			case Interaction.Update: {
				return 'Update';
			}

			default: {
				return 'View';
			}
		}
	};

	/**
	 * @description
	 * Closes the modal
	 */
	const onClose = () => {
		dispatcher('close');
	};

	/**
	 * @description
	 * Validates the form
	 */
	const onValidate = async () => {
		const validatedClip: Partial<TClip> = {
			tags: form.tags,
			title: form.title,
			content: form.content,
			sensitive: form.sensitive,
			id: mode === Interaction.Update ? clip?.id : undefined
		};

		console.log({ validatedClip });

		try {
			// 	if (mode === Interaction.Creation) {
			// 		await ClipHelper.create(validatedClip);
			// 	} else {
			// 		await ClipHelper.update(validatedClip as TClip);
			// 	}
		} finally {
			onClose();
		}
	};

	const onReset = () => {
		form = {
			tags: clip?.tags ?? [],
			title: clip?.title ?? '',
			content: clip?.content ?? '',
			sensitive: clip?.sensitive ?? false
		};
	};

	$: title = getModalTitle();
	$: action = getModalAction();
	$: readonly = mode === Interaction.View;

	onMount(() => {
		onReset();
	});
</script>

<div class="modal">
	<div
		class="modal__box"
		out:send={{ key: 'clipflip', duration: 400 }}
		in:receive={{ key: 'clipflip', duration: 400 }}
	>
		{#if form}
			<form
				class="modal__wrapper"
				on:reset|preventDefault={onReset}
				on:submit|preventDefault={onValidate}
			>
				<div class="modal__head">
					<h3 class="modal__title">{title}</h3>

					<div class="modal__control modal__control--close" in:fade={{ duration: 200 }}>
						<Button
							icon={MdClose}
							size={ButtonSize.Small}
							style={ButtonStyle.Primary}
							on:click={onClose}
						/>
					</div>
				</div>

				<div class="modal__body">
					<div class="modal__input modal__input--title">
						<Input {readonly} name="title" label="Optional title..." bind:value={form.title} />
					</div>

					<div class="modal__input modal__input--content">
						<Input
							{readonly}
							name="content"
							type={InputType.Editor}
							label="Enter the content to save..."
							bind:value={form.content}
						/>
					</div>

					<div class="modal__input modal__input--sensitive">
						<Toggle label="Sensitive" bind:value={form.sensitive} {readonly} />
					</div>

					<div class="modal__input modal__input--tags">
						<Tags label="Tags" bind:value={form.tags} {readonly} />
					</div>
				</div>

				{#if !readonly}
					<div class="modal__foot">
						<div class="modal__control modal__control--reset">
							<Button label="Reset" icon={MdNotInterested} />
						</div>

						<div class="modal__control modal__control--validate">
							<Button label={action} icon={MdCheck} style={ButtonStyle.Primary} />
						</div>
					</div>
				{/if}
			</form>
		{/if}
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
			border-radius: 6px;

			background-color: #ffffff;
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);

			display: flex;
			flex-direction: column;

			width: 100%;
			height: auto;

			#{$root}__wrapper {
				display: contents;

				#{$root}__head {
					padding: $spacing $spacing 0 $spacing;

					display: flex;
					flex-direction: row;

					#{$root}__title {
						font-size: 16px;
						text-transform: capitalize;
						font-weight: var(--font-weight-bold);

						color: var(--color-primary);
					}

					#{$root}__control {
						&--close {
							margin-left: auto;
						}
					}
				}

				#{$root}__body {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;

					padding: $spacing $spacing 0 $spacing;

					#{$root}__input {
						margin-bottom: $spacing;

						:global(.input),
						:global(.toggle) {
							width: 100%;
							height: 100%;
						}

						&--content {
							margin-bottom: $spacing * 0.5;
						}
					}
				}

				#{$root}__foot {
					display: flex;
					align-items: center;
					justify-content: flex-end;

					padding: $spacing;

					#{$root}__control {
						margin-left: $spacing;
					}
				}
			}
		}
	}
</style>
