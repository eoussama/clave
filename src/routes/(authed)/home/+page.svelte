<script lang="ts">
	import ClipList from '$lib/view/clip-list.svelte';
	import ClipAdd from '$lib/controls/clip-add.svelte';
</script>

<div class="head">
	<ClipAdd />
</div>

<div class="content">
	<ClipList />
</div>

<style lang="scss">
	.content {
		margin-top: 16px;
	}
</style>