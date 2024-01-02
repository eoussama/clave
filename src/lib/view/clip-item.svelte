<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import MdVisibility from 'svelte-icons/md/MdVisibility.svelte';
	import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';
	import MdVisibilityOff from 'svelte-icons/md/MdVisibilityOff.svelte';
	import type { TClip } from '../../core/types/clip.type';

	export let clip: TClip;
	let visible = false;
	let copied = false;

	$: content = clip.sensitive && !visible ? hideContent(clip.content) : clip.content;

	const hideContent = (content: string | Blob) => {
		if (typeof content === 'string') {
			return content
				.split('')
				.map((e) => '•')
				.join('');
		}

		return content;
	};

	const onCopy = (e: MouseEvent) => {
		e.stopPropagation();
		if (!visible && clip.sensitive) {
			if (prompt('Password') !== '123') {
				return;
			}
		}

		copy();
	};

	const onToggleVisibility = (e: MouseEvent) => {
		e.stopPropagation();
		if (!visible && clip.sensitive) {
			if (prompt('Password') !== '123') {
				return;
			}
		}

		visible = !visible;
	};

	const copy = () => {
		if (typeof clip.content === 'string') {
			navigator.clipboard.writeText(clip.content);
		} else {
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

<div class="clip">
	<button class="clip__content" on:click={onCopy}>
		<div class="clip__info">
			<h4 class="clip__title">{clip.title}</h4>
			<p class="clip__content">{content}</p>
		</div>

		<div class="clip__controls">
			{#if clip.sensitive}
				<button class="clip__control clip__control--visibility" on:click={onToggleVisibility}>
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
				on:click={onCopy}
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

		&__content {
			all: unset;

			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 2px 10px;

			display: flex;
			cursor: pointer;

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

					opacity: 0.6;
					color: rgb(184, 184, 184);

					transition-duration: 0.2s;
					transition-property: opacity;

					display: flex;
					align-items: center;
					justify-content: center;

					&-icon {
						display: flex;
						position: absolute;
					}

					&--copied {
						color: #22c01c;
					}

					&:hover {
						opacity: 1;
					}

					&:not(:last-of-type) {
						margin-right: 10px;
					}
				}
			}

			&:hover {
				background-color: rgb(250, 250, 250);

				#{$root}__controls {
					opacity: 1;
				}
			}
		}
	}
</style>
