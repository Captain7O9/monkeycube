/**
 * Global store for user data
 */

interface UserSettings {
	inspection: boolean;
}

class User {
	settings: UserSettings = $state({
		inspection: true
	});
}

export default new User();
