<main>
	<form method="POST">
		<button formaction="?/logout">logout</button>
	</form>
</main>

<style>
	main {
		flex-grow: 1;
		margin: 10vh auto;
	}

	button {
		flex: 1;
		padding: 10px;
		color: var(--text-color);
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);

		&:hover {
			color: var(--sub-alt-color);
			background-color: var(--text-color);
		}
	}
</style>
