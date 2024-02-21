<script lang="ts">
	import '../style/main.scss';

	import { onDestroy, onMount } from 'svelte';
	import { derived, type Unsubscriber } from 'svelte/store';

	import Head from '$lib/components/layout/head.svelte';
	import Foot from '$lib/components/layout/foot.svelte';
	import Loader from '$lib/components/layout/loader.svelte';

	import { Page } from '$lib/core/enums/page.enum';
	import { appStore } from '$lib/core/stores/app.store';

	import { AuthHelper } from '$lib/core/helpers/auth.helper';
	import { NavigationHelper } from '$lib/core/helpers/navigation.helper';

	/**
	 * @description
	 * The subscription clean up function.
	 */
	let unsubscribe: Unsubscriber;

	/**
	 * @description
	 * The auth store.
	 */
	let authStore = derived(appStore, () => AuthHelper.isLoggedIn());

	onMount(() => {
		appStore.finishLoading();

		unsubscribe = authStore.subscribe((loggedIn: boolean) => {
			if (loggedIn) {
				NavigationHelper.navigate(Page.Home);
			} else {
				NavigationHelper.navigate(Page.Login);
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<svelte:head>
	<title>Clave</title>
</svelte:head>

<div class="root" class:root--authed={$appStore.user}>
	<Loader>
		{#if $appStore.user}
			<Head />
		{/if}

		<main class="body">
			<slot />
		</main>
	</Loader>

	<Foot />
</div>

<style lang="scss">
	.root {
		position: relative;

		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;

		.body {
			flex: 1;

			width: 100%;
			height: 100%;
		}

		&--authed {
			.body {
				max-height: calc(100% - 60px);
			}
		}
	}
</style>
