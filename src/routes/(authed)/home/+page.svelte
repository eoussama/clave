<script lang="ts">
	import { crossfade, fade } from 'svelte/transition';

	import ClipList from '$lib/components/view/clip-list.svelte';
	import ClipAdd from '$lib/components/controls/clip-add.svelte';
	import ClipModal from '$lib/components/view/clip-modal.svelte';

	let unfocus: boolean;
	let clipModal: boolean;

	const onCreate = () => {
		clipModal = true;
	};

	const onEdit = () => {
		clipModal = true;
	};

	const onClose = () => {
		clipModal = false;
	};

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	});

	$: {
		if (clipModal) {
			unfocus = true;
		} else {
			setTimeout(() => {
				unfocus = false;
			}, 400);
		}
	}
</script>

<div class="root">
	<div class="head">
		{#if !clipModal}
			<div
				class="add-wrapper"
				out:send={{ key: 'clipflip', duration: 400 }}
				in:receive={{ key: 'clipflip', duration: 400 }}
			>
				<ClipAdd on:create={onCreate} />
			</div>
		{/if}
	</div>

	<div class="content">
		<ClipList unfocused={unfocus} on:edit={onEdit} />
	</div>
</div>

{#if clipModal}
	<div class="overlay" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
		<ClipModal {receive} {send} on:close={onClose} />
	</div>
{/if}

<style lang="scss">
	.root {
		$head-height: 50px;

		width: 100%;
		height: 100%;

		.head {
			height: $head-height;
		}

		.content {
			width: 100%;
			height: 100%;

			margin-top: var(--spacing-padding);
			max-height: calc(100% - $head-height);
		}
	}

	.overlay {
		z-index: 10;

		position: absolute;
		left: 0;
		top: 0;

		width: 100%;
		height: 100%;

		backdrop-filter: blur(8px);
		background-color: rgba(var(--color-secondary-rgb), 0.4);
	}
</style>
