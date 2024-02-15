<script lang="ts">
	import { AuthHelper } from '$lib/core/helpers/auth.felper';

	const onLogin = () => {
		AuthHelper.login()
			.then((user) => {
				console.log({ user });
			})
			.catch((err) => {
				console.error(err);
			});
	};
</script>

<div class="root">
	<div class="logo">Logo</div>

	<div class="message">Login</div>

	<div class="controls">
		<button class="control" on:click={onLogin}>Google</button>
	</div>
</div>

<style lang="scss">
	.root {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
</style>
