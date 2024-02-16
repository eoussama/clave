<script lang="ts">
	import FaGoogle from 'svelte-icons/fa/FaGoogle.svelte';
	import Button from '$lib/components/controls/button.svelte';

	import { AuthHelper } from '$lib/core/helpers/auth.felper';

	/**
	 * @description
	 * Logs user in.
	 */
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
	<div class="logo">
		<img src="./images/logo.png" alt="Clave Logo" />
	</div>

	<div class="message">The only clipboard manager that matters</div>

	<div class="controls">
		<Button label="Continue with Google" icon={FaGoogle} primary on:click={onLogin} />
	</div>
</div>

<style lang="scss">
	.root {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		width: 100%;
		height: 100%;

		.logo {
			width: 100px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.message {
			max-width: 200px;
			margin-top: 20px;

			text-align: center;
		}

		.controls {
			width: 100%;
			margin-top: 100px;
		}
	}
</style>
