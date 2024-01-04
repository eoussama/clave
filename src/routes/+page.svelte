<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Route } from '../core/enums/route.enum';



	onMount(() => {
		goto(Route.Home);
	});
</script>
