<script lang="ts">
	/**
	 * @description
	 * If the content is empty
	 */
	export let empty: boolean = false;
</script>

<div class="empty">
	{#if empty}
		<div class="empty__note">
			<slot name="note">No content!</slot>
		</div>
	{:else}
		<div class="empty__content">
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="scss">
	.empty {
		width: 100%;
		height: 100%;

		&__note {
			text-align: center;
		}

		&__content {
			width: 100%;
			height: 100%;
		}
	}
</style>
