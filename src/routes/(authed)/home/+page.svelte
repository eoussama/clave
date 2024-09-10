<script lang="ts">
	import { crossfade, fade } from 'svelte/transition';

	import MdAdd from 'svelte-icons/md/MdAdd.svelte';

	import Action from '$lib/components/controls/action.svelte';
	import ClipList from '$lib/components/views/clip/clip-list.svelte';
	import ClipModal from '$lib/components/views/clip/clip-detail.svelte';

	import { Interaction } from '$lib/core/enums/interaction.enum';

	import type { TClip } from '$lib/core/types/clip.type';
	import type { TNullable } from '$lib/core/types/nullable.type';

	import { ClipHelper } from '$lib/core/helpers/clip.helper';

	let unfocus: boolean;
	let selectedClip: TNullable<TClip>;

	let clipModalVisible: boolean;
	let clipModalMode: Interaction;

	/**
	 * @description
	 * View handler
	 *
	 * @param e The clip to view
	 */
	const onView = (e: CustomEvent<TClip>) => {
		selectedClip = e.detail;
		clipModalMode = Interaction.View;
		clipModalVisible = true;
	};

	/**
	 * @description
	 * Creates a new clip
	 */
	const onCreate = () => {
		selectedClip = null;
		clipModalMode = Interaction.Creation;
		clipModalVisible = true;
	};

	/**
	 * @description
	 * Closes the modal
	 */
	const onClose = () => {
		clipModalVisible = false;
	};

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	});

	$: {
		if (clipModalVisible) {
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
		{#if !clipModalVisible}
			<div
				class="add-wrapper"
				out:send={{ key: 'clipflip', duration: 400 }}
				in:receive={{ key: 'clipflip', duration: 400 }}
			>
				<Action
					icon={MdAdd}
					shine={true}
					ripple={true}
					label="Save a new clip..."
					on:click={onCreate}
				/>
			</div>
		{/if}
	</div>

	<div class="content">
		<ClipList {receive} {send} unfocused={unfocus} on:view={onView} />
	</div>
</div>

{#if clipModalVisible}
	<div class="overlay" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
		<ClipModal {receive} {send} mode={clipModalMode} clip={selectedClip} on:close={onClose} />
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
