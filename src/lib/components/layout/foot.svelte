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
		position: absolute;
		bottom: 0;
		left: 0;

		width: 100%;

		cursor: pointer;
		user-select: none;

		font-size: 11px;
		text-align: center;

		background-color: hsl(var(--color-primary-hsl), 98%);

		transition-duration: 0.2s;
		transition-property: background-color;

		&__link {
			text-decoration: none;
			color: hsl(var(--color-primary-hsl), 70%);
		}

		&:hover {
			background-color: hsl(var(--color-primary-hsl), 95%);
		}
	}
</style>
