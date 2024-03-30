<script lang="ts">
	import MdMoreVert from 'svelte-icons/md/MdMoreVert.svelte';
	import Button from '../controls/button.svelte';

	import { AuthHelper } from '$lib/core/helpers/auth.helper';
	import { appStore } from '$lib/core/stores/app.store';

	/**
	 * @description
	 * Logs user out.
	 */
	const onLogout = () => {
		AuthHelper.logout();
	};
</script>

<header class="head">
	<div class="left">
		<div class="account">
			<div class="account__avatar">
				<img src={$appStore.user?.photoURL} alt="Account avatar" referrerPolicy="no-referrer" />
			</div>

			<div class="account__info">
				<div class="account__name">{$appStore.user?.displayName}</div>
				<div class="account__email">{$appStore.user?.email}</div>
			</div>
		</div>
	</div>

	<div class="right">
		<Button primary iconOnly icon={MdMoreVert} on:click={onLogout} />
	</div>
</header>

<style lang="scss">
	.head {
		width: 100%;
		padding: 6px var(--spacing-padding);

		display: flex;
		flex-direction: row;
		align-items: center;

		background-color: hsl(var(--color-primary-hsl), 95%);

		.right {
			display: flex;
			margin-left: auto;
		}

		.account {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			&__avatar {
				display: flex;

				width: 30px;
				margin-right: 6px;

				overflow: hidden;
				border-radius: 50%;

				img {
					width: 100%;
				}
			}

			&__info {
				position: relative;
				top: 1px;

				line-height: 1.2;
			}

			.account__name {
				color: var(--color-text);

				font-size: 12px;
				text-transform: uppercase;
				font-weight: var(--font-weight-bold);
			}

			.account__email {
				font-size: 12px;
				font-weight: var(--font-weight-light);

				color: hsl(var(--color-text-hsl), 70%);
			}
		}
	}
</style>
