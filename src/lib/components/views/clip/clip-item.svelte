<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdVisibility from 'svelte-icons/md/MdVisibility.svelte';
	import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';
	import MdVisibilityOff from 'svelte-icons/md/MdVisibilityOff.svelte';

	import type { TClip } from '$lib/core/types/clip.type';
	import Button from '$lib/components/controls/button.svelte';
	import { ButtonSize } from '$lib/core/enums/button-size.enum';
	import { ButtonStyle } from '$lib/core/enums/button-style.enum';

	/**
	 * @description
	 * Event dispatcher
	 */
	const dispatcher = createEventDispatcher();

	/**
	 * @description
	 * The clip to display
	 */
	export let clip: TClip;

	/**
	 * @description
	 * If the clip content is visible
	 */
	let visible = false;

	/**
	 * @description
	 * If the clip content is copied
	 */
	let copied = false;

	/**
	 * @todo
	 * Move to auth helper
	 *
	 * @description
	 * Checks if the clip content is visible
	 */
	const tmpAuth = () => {
		if (!visible && clip.sensitive) {
			return prompt('Password') === '123';
		}

		return true;
	};

	/**
	 * @description
	 * Hides the clip content
	 *
	 * @param content The clip content
	 */
	const hideContent = (content: string | Blob) => {
		if (typeof content === 'string') {
			return content
				.split('')
				.map(() => '•')
				.join('')
				.substring(0, 30);
		}

		return content;
	};

	/**
	 * @description
	 * Copies the clip content
	 */
	const onCopy = (e: any) => {
		console.log(e);
		if (!tmpAuth()) {
			return;
		}

		copied = true;
		dispatcher('copy', clip);

		const timer = setTimeout(() => {
			copied = false;
			clearTimeout(timer);
		}, 1000);
	};

	/**
	 * @description
	 * Toggles the clip content visibility
	 */
	const onVisibilityToggle = () => {
		if (!tmpAuth()) {
			return;
		}

		visible = !visible;
	};

	$: content = clip.sensitive && !visible ? hideContent(clip.content) : clip.content;
</script>

<div class="clip" class:clip--sensitive={clip.sensitive}>
	<button class="clip__box" on:click|stopPropagation={onCopy}>
		<div class="clip__controls clip__controls--left"></div>

		<div class="clip__info">
			<h4 class="clip__title">{clip.title}</h4>
			<p class="clip__content" class:clip__content--hidden={!visible}>{content}</p>
		</div>

		<div class="clip__controls clip__controls--right">
			<div class="clip__control">
				<Button
					ripple
					size={ButtonSize.Small}
					style={ButtonStyle.Primary}
					icon={visible ? MdVisibilityOff : MdVisibility}
					on:click={onVisibilityToggle}
				/>
			</div>

			<div class="clip__control">
				<Button
					ripple
					size={ButtonSize.Small}
					style={ButtonStyle.Primary}
					icon={copied ? MdCheck : MdContentCopy}
					on:click={onCopy}
				/>
			</div>

			<!-- <button
				class="clip__control clip__control--copy"
				class:clip__control--copied={copied}
				on:click|stopPropagation={onCopy}
			>
				{#if copied}
					<span
						class="clip__control-icon"
						in:fly={{ y: 15, duration: 200 }}
						out:fly={{ y: -15, duration: 200 }}
					>
						<MdCheck />
					</span>
				{:else}
					<span
						class="clip__control-icon"
						in:fly={{ y: 15, duration: 200 }}
						out:fly={{ y: -15, duration: 200 }}
					>
						<MdContentCopy />
					</span>
				{/if}
			</button> -->
		</div>
	</button>
</div>

<style lang="scss">
	.clip {
		$root: &;

		&__box {
			all: unset;
			cursor: pointer;

			width: 100%;
			height: 100%;

			box-sizing: border-box;
			background-color: #ffffff;
			padding: 2px var(--spacing-padding);

			display: flex;

			transition-duration: 0.2s;
			transition-property: background-color;

			#{$root}__info {
				flex: 1;
				max-width: 250px;
				color: hsl(var(--color-primary-hsl), 40%);

				#{$root}__title {
					padding: 0;

					text-transform: capitalize;

					font-size: 12px;
					font-weight: var(--font-weight-bold);
					font-family: var(--font-family-primary);
				}

				#{$root}__content {
					padding: 0;

					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;

					font-size: 14px;
					font-weight: var(--font-weight-light);
					font-family: var(--font-family-primary);
				}
			}

			#{$root}__controls {
				display: flex;
				align-items: center;
				justify-content: center;

				transition-duration: 0.2s;
				transition-property: opacity;

				#{$root}__control {
					// all: unset;

					// 		width: 18px;
					// 		height: 18px;
					// 		position: relative;

					// 		color: rgba(var(--color-primary-rgb), 0.4);

					// 		transition-duration: 0.2s;
					// 		transition-property: color;

					// 		display: flex;
					// 		align-items: center;
					// 		justify-content: center;

					// 		&-icon {
					// 			display: flex;
					// 			position: absolute;
					// 		}

					// 		&--copied {
					// 			color: var(--color-success);
					// 		}

					// 		&:hover {
					// 			color: rgba(var(--color-primary-rgb), 0.8);
					// 		}

					&:not(:last-of-type) {
						margin-right: var(--spacing-padding);
					}
				}

				&--right {
					margin-left: auto;
				}
			}

			&:hover {
				background-color: hsl(var(--color-secondary-hsl), 97%);

				#{$root}__controls {
					opacity: 1;
				}
			}
		}

		// &--sensitive {
		// 	#{$root}__box {
		// 		#{$root}__info {
		// 			#{$root}__content {
		// 				&--hidden {
		// 					filter: blur(3px);
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}
</style>
