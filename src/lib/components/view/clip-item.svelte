<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import MdEdit from 'svelte-icons/md/MdEdit.svelte';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import MdVisibility from 'svelte-icons/md/MdVisibility.svelte';
	import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';
	import MdVisibilityOff from 'svelte-icons/md/MdVisibilityOff.svelte';

	import type { TClip } from '$lib/core/types/clip.type';

	const dispatcher = createEventDispatcher();

	export let clip: TClip;

	let visible = false;
	let copied = false;

	const tmpAuth = () => {
		if (!visible && clip.sensitive) {
			return prompt('Password') === '123';
		}

		return true;
	};

	$: content = clip.sensitive && !visible ? hideContent(clip.content) : clip.content;

	const hideContent = (content: string | Blob) => {
		if (typeof content === 'string') {
			return content
				.split('')
				.map(() => '•')
				.join('');
		}

		return content;
	};

	const onCopy = () => {
		if (!tmpAuth()) {
			return;
		}

		copy();
	};

	const onEdit = () => {
		if (!tmpAuth()) {
			return;
		}

		dispatcher('edit');
	};

	const onDelete = () => {
		if (!tmpAuth()) {
			return;
		}

		dispatcher('delete');
	};

	const onToggleVisibility = () => {
		if (!tmpAuth()) {
			return;
		}

		visible = !visible;
	};

	const copy = () => {
		if (typeof clip.content === 'string') {
			navigator.clipboard.writeText(clip.content);
		} else {
			// TODO: copy logic
			const clipboard = [new ClipboardItem({ [clip.content.type]: clip.content })];
			navigator.clipboard.write(clipboard);
		}

		copied = true;
		const timer = setTimeout(() => {
			copied = false;
			clearTimeout(timer);
		}, 1000);
	};
</script>

<div class="clip" class:clip--sensitive={clip.sensitive}>
	<button class="clip__box" on:click|stopPropagation={onCopy}>
		<div class="clip__info">
			<h4 class="clip__title">{clip.title}</h4>
			<p class="clip__content" class:clip__content--hidden={!visible}>{content}</p>
		</div>

		<div class="clip__controls">
			<button class="clip__control clip__control--delete" on:click|stopPropagation={onDelete}>
				<span class="clip__control-icon">
					<MdDelete />
				</span>
			</button>

			<button class="clip__control clip__control--edit" on:click|stopPropagation={onEdit}>
				<span class="clip__control-icon">
					<MdEdit />
				</span>
			</button>

			{#if clip.sensitive}
				<button
					class="clip__control clip__control--visibility"
					on:click|stopPropagation={onToggleVisibility}
				>
					{#if visible}
						<span
							class="clip__control-icon"
							in:fade={{ duration: 200 }}
							out:fade={{ duration: 200 }}
						>
							<MdVisibilityOff />
						</span>
					{:else}
						<span
							class="clip__control-icon"
							in:fade={{ duration: 200 }}
							out:fade={{ duration: 200 }}
						>
							<MdVisibility />
						</span>
					{/if}
				</button>
			{/if}

			<button
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
			</button>
		</div>
	</button>
</div>

<style lang="scss">
	.clip {
		$root: &;

		&__box {
			all: unset;

			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 2px var(--spacing-padding);

			cursor: pointer;
			display: flex;

			transition-duration: 0.2s;
			transition-property: background-color;

			#{$root}__info {
				flex: 1;

				#{$root}__title {
					padding: 0;

					font-size: 12px;
					text-transform: capitalize;
					font-weight: var(--font-weight-bold);
				}

				#{$root}__content {
					padding: 0;
					display: inline;

					font-size: 14px;
					font-weight: var(--font-weight-light);
				}
			}

			#{$root}__controls {
				display: flex;
				align-items: center;
				justify-content: center;

				opacity: 0;
				margin-left: auto;

				transition-duration: 0.2s;
				transition-property: opacity;

				#{$root}__control {
					all: unset;

					width: 18px;
					height: 18px;
					position: relative;

					color: rgba(var(--color-primary-rgb), 0.4);

					transition-duration: 0.2s;
					transition-property: color;

					display: flex;
					align-items: center;
					justify-content: center;

					&-icon {
						display: flex;
						position: absolute;
					}

					&--copied {
						color: var(--color-success);
					}

					&:hover {
						color: rgba(var(--color-primary-rgb), 0.8);
					}

					&:not(:last-of-type) {
						margin-right: var(--spacing-padding);
					}
				}
			}

			&:hover {
				background-color: rgba(var(--color-secondary-rgb), 0.3);

				#{$root}__controls {
					opacity: 1;
				}
			}
		}

		&--sensitive {
			#{$root}__box {
				#{$root}__info {
					#{$root}__content {
						&--hidden {
							filter: blur(3px);
						}
					}
				}
			}
		}
	}
</style>
