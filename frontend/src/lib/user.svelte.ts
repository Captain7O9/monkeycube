import type { Time, User } from '$lib/types';
import { apiFetch } from '$lib/utils';

function createUser() {
  const defaultUser: User = {
    _id: '',
    email: '',
    username: '',
    full_name: '',
    disabled: false
  };

  let userStore = $state(defaultUser);

  return {
    // Getters
    get _id() {
      return userStore;
    },
    get username() {
      return userStore.username;
    },
    get full_name() {
      return userStore.full_name;
    },
    get email() {
      return userStore.email;
    },
    get disabled() {
      return userStore.disabled;
    },

    // Setters
    set(newUser?: User | null) {
      userStore = newUser ? newUser : defaultUser;
    },

    // Methods
    isLoggedIn() {
      return userStore.username !== '';
    },
    async login(username: string, password: string) {
      await this.logout();
      await apiFetch({
        endpoint: '/token',
        options: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            username,
            password
          })
        },
        sendToken: true
      });
      const newUser = await this.fetchUser();
      console.log(newUser);
      user.set(newUser);
    },
    async logout() {
      await apiFetch({
        endpoint: '/logout',
        options: { method: 'POST' },
        sendToken: true
      });
      user.set();
    },

    // API
    async fetchTimes(username: string = userStore.username) {
      const response = await apiFetch({ endpoint: `/users/${username}/times` });
      return response.content;
    },
    async fetchUser() {
      const response = await apiFetch({
        endpoint: '/users',
        sendToken: true,
        excludedErrors: [401]
      });
      return response.status === 200 ? response.content : null;
    },
    async createTime(time: Time) {
      await apiFetch({
        endpoint: '/times',
        options: {
          method: 'POST',
          body: JSON.stringify(time),
          headers: {
            'Content-Type': 'application/json'
          }
        },
        sendToken: true
      });
    },
    async updateTime(time: Partial<Time>) {
      await apiFetch({
        endpoint: `/times/${time._id}`,
        options: {
          method: 'PATCH',
          body: JSON.stringify(time),
          headers: {
            'Content-Type': 'application/json'
          }
        },
        sendToken: true
      });
    },
    async deleteTime(timeId: string) {
      await apiFetch({
        endpoint: `/times/${timeId}`,
        options: { method: 'DELETE' },
        sendToken: true
      });
    }
  };
}

export const user = createUser();
