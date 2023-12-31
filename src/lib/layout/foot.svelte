<script lang="ts">
	import { PUBLIC_VERSION } from '$env/static/public';
</script>

<footer class="foot">
	<p class="foot__content">
		<a
			target="_blank"
			class="foot__link"
			rel="noopener noreferrer"
			href="https://github.com/EOussama/clave"
		>
			<span>Clave</span> • <span>v{PUBLIC_VERSION}</span>
		</a>
	</p>
</footer>

<style lang="scss">
	.foot {
		cursor: pointer;
		user-select: none;

		font-size: 12px;
		text-align: center;

		background-color: whitesmoke;

		transition-duration: 0.2s;
		transition-property: background-color;

		&__link {
			text-decoration: none;
			color: var(--color-text);
		}

		&:hover {
			background-color: rgb(238, 238, 238);
		}
	}
</style>
