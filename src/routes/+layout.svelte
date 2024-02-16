<script lang="ts">
	import '../style/main.scss';

	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';

	import Head from '$lib/components/layout/head.svelte';
	import Foot from '$lib/components/layout/foot.svelte';

	import { Page } from '$lib/core/enums/page.enum';
	import { appStore } from '$lib/core/stores/app.store';

	import { AuthHelper } from '$lib/core/helpers/auth.helper';
	import { NavigationHelper } from '$lib/core/helpers/navigation.helper';

	onMount(() => {
		const auth = AuthHelper.getAuth();

		onAuthStateChanged(auth, (user) => {
			if (user) {
				appStore.login(user);
			} else {
				appStore.logout();
			}
		});

		appStore.subscribe((e) => {
			if (AuthHelper.isLoggedIn()) {
				NavigationHelper.navigate(Page.Home);
			} else {
				NavigationHelper.navigate(Page.Login);
			}
		});
	});
</script>

<svelte:head>
	<title>Clave</title>
</svelte:head>

<div class="root">
	{#if $appStore.user}
		<Head />
	{/if}

	<main class="body">
		<slot />
	</main>

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
		}
	}
</style>
