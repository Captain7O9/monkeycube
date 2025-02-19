class Session {
	start = Date.now();

	startNew = () => {
		this.start = Date.now();
	};
}

export default new Session();
