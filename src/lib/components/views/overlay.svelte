<script lang="ts">
	import { quadOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	/**
	 * @description
	 * If the overlay should block the content
	 */
	export let block: boolean = false;

	/**
	 * @description
	 * Gets the transition object for the transition
	 *
	 * @param delay The delay of the transition
	 * @param inTransition If the transition is in or out
	 */
	const getBackgroundTransition = (delay: number, inTransition: boolean) => ({
		easing: quadOut,
		delay: block ? delay : 0,
		duration: block ? 600 : 600,
		y: inTransition ? '100%' : '-100%'
	});
</script>

<div class="overlay" class:overlay--block={block}>
	<div class="overlay__backgrounds">
		<div
			class="overlay__background overlay__background--1"
			in:fly={getBackgroundTransition(0, true)}
			out:fly={getBackgroundTransition(350, false)}
		></div>

		<div
			class="overlay__background overlay__background--2"
			in:fly={getBackgroundTransition(150, true)}
			out:fly={getBackgroundTransition(250, false)}
		></div>

		<div
			class="overlay__background overlay__background--3"
			in:fly={getBackgroundTransition(300, true)}
			out:fly={getBackgroundTransition(150, false)}
		></div>
	</div>

	<div
		class="overlay__content"
		in:fade={{
			duration: 200,
			delay: block ? 400 : 0
		}}
		out:fade={{
			duration: 200
		}}
	>
		<slot />
	</div>
</div>

<style lang="scss">
	.overlay {
		$root: &;

		z-index: 10;
		pointer-events: none;

		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		margin: auto;

		&__backgrounds {
			top: 0;
			left: 0;
			position: absolute;

			width: 100%;
			height: 100%;

			opacity: 0;

			transition-duration: 0.2s;
			transition-property: opacity;

			#{$root}__background {
				top: 0;
				left: 0;
				position: absolute;

				width: 100%;
				height: 100%;

				backdrop-filter: blur(1px);

				&--1 {
					background-color: rgba(var(--color-primary-rgb), 0.2);
				}

				&--2 {
					background-color: rgba(var(--color-primary-rgb), 0.2);
				}

				&--3 {
					background-color: rgba(var(--color-secondary-rgb), 0.8);
				}
			}
		}

		&__content {
			z-index: 12;

			position: absolute;
			top: 0;
			left: 0;

			width: 100%;
			height: 100%;

			& > :global(*) {
				pointer-events: all;
			}
		}

		&--block {
			pointer-events: all;

			#{$root}__backgrounds {
				opacity: 1;
			}
		}
	}
</style>
