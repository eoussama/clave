<script lang="ts">
	import '../style/main.scss';

	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';

	import Head from '$lib/components/layout/head.svelte';
	import Foot from '$lib/components/layout/foot.svelte';

	import { Page } from '$lib/core/enums/page.enum';
	import { AuthHelper } from '$lib/core/helpers/auth.felper';
	import { NavigationHelper } from '$lib/core/helpers/navigation.helper';

	onMount(() => {
		const auth = AuthHelper.getAuth();

		onAuthStateChanged(auth, (user) => {
			if (user) {
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
	<Head />

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
			padding: 16px;
		}
	}
</style>
