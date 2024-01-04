<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';

	const dispatcher = createEventDispatcher();

	function onClick(e: MouseEvent) {
		dispatcher('create');
	}
</script>

<div class="add">
	<button class="add__box" on:click={onClick}>
		<input class="add__message" type="text" placeholder="Save a New Clip..." disabled />
		<div class="add__icon">
			<MdAdd />
		</div>
	</button>
</div>

<style lang="scss">
	.add {
		$root: &;
		z-index: 2;
		
		position: relative;
		border-radius: 5px;
		
		outline-offset: 0;
		outline: 1px solid transparent;
		
		transition-duration: 0.2s;
		transition-property: transform outline-offset;
		
		&__box {
			all: inherit;
			
			z-index: 2;
			cursor: pointer;

			z-index: 0;
			overflow: hidden;
			position: relative;

			width: 100%;
			height: 100%;
			display: block;
			user-select: none;

			border-radius: 5px;
			background: linear-gradient(
				to right,
				var(--color-primary),
				hsl(var(--color-primary-hsl), 70%)
			);

			#{$root}__icon,
			#{$root}__message {
				pointer-events: none;
			}

			#{$root}__message {
				width: 100%;
				padding: 15px;

				border: none;
				outline: none;
				background-color: transparent;

				font-size: 14px;
				font-weight: var(--font-weight-light);
				font-family: var(--font-family-primary);

				&::placeholder {
					color: var(--color-secondary);
				}
			}

			#{$root}__icon {
				width: 24px;
				height: 24px;

				position: absolute;
				right: 6px;
				top: 50%;

				color: var(--color-secondary);
				transform: translateY(-50%);
			}

			&::before {
				z-index: 1;
				content: '';

				top: 0;
				left: 0;
				position: absolute;

				width: 100%;
				height: 100%;
				transform: translateX(100%);

				animation-duration: 1s;
				animation-name: highlight;
				animation-iteration-count: infinite;
				animation-timing-function: ease-in-out;

				background: linear-gradient(
					to left,
					transparent 0%,
					rgba(var(--color-secondary-rgb), 0.15) 40%,
					transparent 80%
				);

				@keyframes highlight {
					from {
						transform: translateX(-100%);
					}

					to {
						transform: translateX(100%);
					}
				}
			}
		}

		&:hover {
			transform: scale(1.005);

			outline-offset: 2px;
			outline-color: var(--color-primary);
		}
	}
</style>
