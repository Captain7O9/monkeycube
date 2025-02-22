<!-- Stolen from monkeycube -->

<div>
	<div class="icon"></div>

	<h1 class="text">
		<span class="top">monkey see</span>
		monkeycube
	</h1>
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: last baseline;
		gap: 10px;

		.icon {
			height: 0.8em;
			width: 0.8em;
			border-radius: calc(var(--border-radius) / 3);
			outline: solid var(--main-color);
			background: linear-gradient(-45deg, transparent 50%, var(--main-color) 50%) right;
			background-size: 300%;
			transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}

		&:hover > .icon {
			background-position: left;
		}

		.text {
			position: relative;
			font-size: 2rem;
			line-height: 2rem;
			font-family:
				Lexend Deca,
				sans-serif;
			transition: color 0.25s;
			font-weight: unset;
			margin-block-start: unset;
			margin-block-end: unset;
			margin-top: -0.23em;

			.top {
				position: absolute;
				left: 0.35em;
				font-size: 0.325em;
				line-height: 0.325em;
				color: var(--sub-color);
				transition:
					color 0.125s,
					opacity 0.125s;
			}
		}
	}
</style>
