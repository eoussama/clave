<script lang="ts">
	import { appStore } from '$lib/core/stores/app.store';
	import { AuthHelper } from '$lib/core/helpers/auth.felper';

	const onLogout = () => {
		AuthHelper.logout();
	};
</script>

<header class="head">
	Head

	{#if $appStore.user}
		<button on:click={onLogout}>Logout</button>
	{/if}
</header>

<style lang="scss">
	.head {
	}
</style>
