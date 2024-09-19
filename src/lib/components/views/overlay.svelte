<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="overlay">
	<div class="overlay__background"></div>
	<div class="overlay__content">Content</div>
</div>

<style lang="scss">
	.overlay {
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

		&__background {
			position: absolute;
			left: 0;
			top: 0;

			width: 100%;
			height: 100%;

			background-color: rgba(var(--color-primary-rgb), 0.4);
		}
	}
</style>
