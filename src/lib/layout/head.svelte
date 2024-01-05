<script lang="ts">
	import { AuthHelper } from '../../core/helpers/auth.felper';

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
