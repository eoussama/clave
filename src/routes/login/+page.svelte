<script lang="ts">
	import { fly } from 'svelte/transition';
	import FaGoogle from 'svelte-icons/fa/FaGoogle.svelte';

	import Button from '$lib/components/controls/button.svelte';
	import { AuthHelper } from '$lib/core/helpers/auth.helper';

	/**
	 * @description
	 * The state of loggin-in.
	 */
	let loggingIn: boolean = false;

	/**
	 * @description
	 * Logs user in.
	 */
	const onLogin = () => {
		loggingIn = true;

		AuthHelper.login()
			.then((user) => {
				console.log({ user });
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => (loggingIn = false));
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
			<Button
				primary
				icon={FaGoogle}
				loading={loggingIn}
				label="Continue with Google"
				loadingLabel="Logging-in..."
				on:click={onLogin}
			/>
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

		--s: 60px;
		--c1: #ffffff;
		--c2: hsl(var(--color-primary-hsl), 98%);

		background:
			repeating-conic-gradient(var(--c1) 0 25%, #0000 0 50%) 0 0 / calc(4 * var(--s))
				calc(2 * var(--s)),
			conic-gradient(#0000 50%, var(--c2) 0) calc(var(--s) / 2) 0 / calc(2 * var(--s)) 1%,
			radial-gradient(var(--c2) 70%, var(--c1) 72%) 0 0 / var(--s) var(--s);

		animation-name: background-scroll;
		animation-duration: 10s;
		animation-fill-mode: both;
		animation-direction: normal;
		animation-timing-function: linear;
		animation-iteration-count: infinite;

		@keyframes background-scroll {
			from {
				background-position: 0;
			}

			to {
				background-position: 240px;
			}
		}

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
				max-width: 220px;
				margin-top: 20px;

				font-size: 16px;
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
