<script lang="ts">
	import { fly } from 'svelte/transition';
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
	<div class="head">
		<div class="logo" in:fly={{ y: 5, duration: 500 }}>
			<img src="./images/logo.png" alt="Clave Logo" />
		</div>

		<div class="message" in:fly={{ y: 5, duration: 500, delay: 100 }}>
			The only clipboard manager that matters
		</div>
	</div>

	<div class="foot">
		<div class="divider" in:fly={{ y: 5, duration: 500, delay: 200 }}>
			<div class="divider__text">Login</div>
		</div>

		<div class="controls" in:fly={{ y: 5, duration: 500, delay: 300 }}>
			<Button label="Continue with Google" icon={FaGoogle} primary on:click={onLogin} />
		</div>
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

		.head {
			width: 100%;

			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;

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
		}

		.foot {
			width: 100%;
			margin-top: 100px;

			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;

			.divider {
				--divider-spacing: 50px;

				position: relative;

				width: 100%;
				margin: 10px 0;
				text-align: center;

				&__text {
					font-size: 14px;
				}

				&::before,
				&::after {
					content: '';

					border: none;
					border-radius: 5px;

					top: 50%;
					position: absolute;
					transform: translateY(-50%);

					height: 1px;
					width: calc(50% - var(--divider-spacing) * 1.7);

					background-color: var(--color-primary);
				}

				&::before {
					left: var(--divider-spacing);
				}

				&::after {
					right: var(--divider-spacing);
				}
			}

			.controls {
				width: 100%;
			}
		}
	}
</style>
