<script lang="ts">
	import { AuthHelper } from '$lib/core/helpers/auth.helper';

	/**
	 * @description
	 * Logs user out.
	 */
	const onLogout = () => {
		AuthHelper.logout();
	};
</script>

<header class="head">
	Head

	<button on:click={onLogout}>Logout</button>
</header>

<style lang="scss">
	.head {
	}
</style>
