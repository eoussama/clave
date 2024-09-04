<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';

	import { field, form } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import MdNotInterested from 'svelte-icons/md/MdNotInterested.svelte';

	import Tags from '../../controls/tags.svelte';
	import Input from '../../controls/input.svelte';
	import Button from '../../controls/button.svelte';
	import Toggle from '../../controls/toggle.svelte';

	import { ClipHelper } from '$lib/core/helpers/clip.helper';

	import type { TClip } from '$lib/core/types/clip.type';
	import type { TNullable } from '$lib/core/types/nullable.type';

	import { InputType } from '$lib/core/enums/input-type.enum';
	import { ButtonType } from '$lib/core/enums/button-type.enum';
	import { ButtonSize } from '$lib/core/enums/button-size.enum';
	import { Interaction } from '$lib/core/enums/interaction.enum';
	import { ButtonStyle } from '$lib/core/enums/button-style.enum';

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
	 * @description
	 * The loading state of the modal
	 */
	let loading = false;

	/**
	 * @decription
	 * The tag text
	 */
	let newTagtext: string;

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

	$: pageTitle = getModalTitle();
	$: pageAction = getModalAction();
	$: pageReadonly = mode === Interaction.View;

	const tags = field('tags', clip?.tags ?? []);
	const title = field('title', clip?.title ?? '');
	const sensitive = field('sensitive', clip?.sensitive ?? false);
	const content = field('content', clip?.content ?? '', [required()]);
	const clipForm = form(title, content, sensitive, tags);

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
		try {
			loading = true;

			await clipForm.validate();
			const validation: any = await new Promise((resolve) => clipForm.subscribe((e) => resolve(e)));

			if (!validation.valid) {
				throw new Error();
			}

			const validatedClip: Partial<TClip> = validation.summary;

			if (mode === Interaction.Creation) {
				await ClipHelper.create(validatedClip);
			} else {
				const updatedClip = { ...clip, ...validatedClip };
				await ClipHelper.update(updatedClip as TClip);
			}

			onClose();
		} finally {
			loading = false;
		}
	};

	/**
	 * @description
	 * Resets the form
	 */
	const onReset = () => {
		newTagtext = '';
		clipForm.reset();
	};

	onMount(() => {
		onReset();
		setTimeout(() => clipForm.reset());
	});
</script>

<div class="modal">
	<div
		class="modal__box"
		out:send={{ key: 'clipflip', duration: 400 }}
		in:receive={{ key: 'clipflip', duration: 400 }}
	>
		<div class="modal__head">
			<h3 class="modal__title">{pageTitle}</h3>

			<div class="modal__control modal__control--close" in:fade={{ duration: 200 }}>
				<Button
					ripple={true}
					icon={MdClose}
					size={ButtonSize.Small}
					style={ButtonStyle.Primary}
					on:click={onClose}
				/>
			</div>
		</div>

		<div class="modal__body">
			<div class="modal__input modal__input--title">
				<Input
					name="title"
					disabled={loading}
					readonly={pageReadonly}
					label="Optional title..."
					bind:value={$title.value}
				/>
			</div>

			<div class="modal__input modal__input--content">
				<Input
					name="content"
					disabled={loading}
					readonly={pageReadonly}
					type={InputType.Editor}
					error={$content.invalid}
					errorMsg="Content is required"
					label="Enter the content to save..."
					bind:value={$content.value}
				/>
			</div>

			<div class="modal__input modal__input--sensitive">
				<Toggle
					label="Sensitive"
					disabled={loading}
					readonly={pageReadonly}
					bind:value={$sensitive.value}
				/>
			</div>

			<div class="modal__input modal__input--tags">
				<Tags
					label="Tags"
					disabled={loading}
					readonly={pageReadonly}
					bind:newTagtext
					bind:value={$tags.value}
				/>
			</div>
		</div>

		{#if !pageReadonly}
			<div class="modal__foot">
				<div class="modal__control modal__control--reset">
					<Button
						label="Reset"
						ripple={true}
						icon={MdNotInterested}
						on:click={onReset}
						disabled={!$clipForm.dirty || loading}
					/>
				</div>

				<div class="modal__control modal__control--validate">
					<Button
						{loading}
						ripple={true}
						icon={MdCheck}
						label={pageAction}
						type={ButtonType.Submit}
						style={ButtonStyle.Primary}
						on:click={onValidate}
					/>
				</div>
			</div>
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
</style>
