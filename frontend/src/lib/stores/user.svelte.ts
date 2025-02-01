import type { Time, User } from '$lib/types';
import { apiFetch } from '$lib/utils';

const defaultUser: User = {
  _id: '',
  email: '',
  username: '',
  full_name: '',
  disabled: false
};

const sessionStart = Date.now();
let userStore = $state(defaultUser);

/**
 * @returns Promise containing the `User` if he is logged in, else `null`.
 */
async function fetchUser(): Promise<User | null> {
  const response = await apiFetch({
    endpoint: '/users',
    sendToken: true,
    excludedErrors: [401]
  });
  return response.status === 200 ? response.content : null;
}

/**
 * @param newUser Reset the user store if null.
 */
function set(newUser?: User) {
  userStore = newUser ?? defaultUser;
}

function isLoggedIn() {
  return Boolean(userStore.username);
}

async function login(username: string, password: string) {
  await logout();
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
  const newUser = await fetchUser();
  if (newUser) {
    set(newUser);
  }
}

async function logout() {
  await apiFetch({
    endpoint: '/logout',
    options: { method: 'POST' },
    sendToken: true
  });
  user.set();
}

/**
 * @param username Username of the user to fetch times from, defaults to current logged-in users.
 * @param since Epoch time to fetch times since. If not provided or 0, fetches all times.
 *
 * @returns Promise containing the fetched `Time[]`.
 */
async function fetchTimes(username = userStore.username, since = 0): Promise<Time[]> {
  const response = await apiFetch({ endpoint: `/users/${username}/times?since=${since}` });
  return response.content;
}

/**
 * @param timeId ID of the time entry to fetch.
 * @returns Promise containing the fetched `Time`.
 */
async function fetchTime(timeId: string) {
  const response = await apiFetch({ endpoint: `/times/${timeId}` });
  return response.content;
}

/**
 * @returns Promise containing the created `Time`.
 */
async function createTime(time: Time) {
  const response = await apiFetch({
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
  return response.content;
}

/**
 * @returns Promise containing the updated `Time`.
 */
async function updateTime(time: Time) {
  const response = await apiFetch({
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
  return response.content;
}

/**
 *
 * @param timeId ID of the time entry to delete.
 */
async function deleteTime(timeId: string) {
  await apiFetch({
    endpoint: `/times/${timeId}`,
    options: { method: 'DELETE' },
    sendToken: true
  });
}

function createUserStore() {
  return {
    get _id() {
      return userStore._id;
    },
    get username() {
      return userStore.username;
    },
    get sessionStart() {
      return sessionStart;
    },

    // User methods
    set,
    fetchUser,
    isLoggedIn,
    login,
    logout,

    // Time methods
    fetchTime,
    fetchTimes,
    createTime,
    updateTime,
    deleteTime
  };
}

export const user = createUserStore();
