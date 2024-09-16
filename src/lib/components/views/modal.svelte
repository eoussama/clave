<script lang="ts">
	// TODO: close
	// TODO: body
	// TODO: state

	/**
	 * @description
	 * The title of the modal
	 */
	export let title: string;
</script>

<div class="modal">
	<div class="modal__element">
		<div class="modal__head">
			<h3 class="modal__title">{title}</h3>

			<div class="modal__controls">
				<div class="modal__control modal__control--close"></div>
			</div>
		</div>

		<div class="modal__body"></div>
	</div>
</div>

<style lang="scss">
	.modal {
	}
</style>
