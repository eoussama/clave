<script lang="ts">
	import '../style/main.scss';

	import Head from '$lib/layout/head.svelte';
	import Foot from '$lib/layout/foot.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { AuthHelper } from '../core/helpers/auth.felper';
	import { goto } from '$app/navigation';
	import { Route } from '../core/enums/route.enum';
	import { onMount } from 'svelte';

	onMount(() => {
		const auth = AuthHelper.getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('logged in');
				goto(Route.Home);
			} else {
				console.log('not logged in');
				goto(Route.Login);
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
