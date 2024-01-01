<!-- TODO: Highlight animation to draw attention to the add button -->
<script lang="ts">
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';

	function onClick(e: MouseEvent) {
		console.log('add');
	}
</script>

<div class="add">
	<button class="add__box" on:click={onClick}>
		<input class="add__message" type="text" placeholder="Content..." disabled />
		<div class="add__icon">
			<MdAdd />
		</div>
	</button>
</div>

<style lang="scss">
	.add {
		$root: &;

		cursor: pointer;
		position: relative;

		transition-duration: 0.2s;
		transition-property: transform;

		&__box {
			all: inherit;

			width: 100%;
			height: 100%;
			display: block;
			user-select: none;
			pointer-events: none;

			#{$root}__message {
				width: 100%;
				padding: 10px 12px;

				border: none;
				outline: none;
				border-radius: 5px;
				background-color: whitesmoke;

				font-size: 12px;
        font-weight: var(--font-weight-light);
				font-family: var(--font-family-primary);
			}

			#{$root}__icon {
				width: 24px;
				height: 24px;

				position: absolute;
				right: 6px;
				top: 50%;

				color: rgb(184, 184, 184);
				transform: translateY(-50%);
			}
		}

		&:hover {
			transform: scale(1.01);
		}
	}
</style>
