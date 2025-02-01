import type { Time, User } from '$lib/types';
import { apiFetch } from '$lib/utils';

const defaultUser: User = {
  _id: '',
  email: '',
  username: '',
  full_name: '',
  disabled: false
};

const defaultTimes: Time[] = [];

const sessionStart = Date.now();
let userStore = $state(defaultUser);
let timesStore = $state(defaultTimes);

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
function set(newUser?: User | null) {
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
 * @param timeId ID of the time entry to fetch.
 * @returns Promise containing the fetched `Time`.
 */
async function fetchOne(timeId: string) {
  const response = await apiFetch({ endpoint: `/times/${timeId}` });
  return response.content;
}

/**
 * Fetches all times for a user since a certain timestamp and stores them in the `timesStore`.
 * @param username Username of the user to fetch times for.
 * @param since Fetch times since this timestamp.
 * @returns Promise containing the fetched `Time[]`.
 */
async function fetchMany(username = userStore.username, since = 0) {
  const response = await apiFetch({ endpoint: `/users/${username}/times?since=${since}` });
  timesStore = response.content;
  timesStore.sort((a, b) => (a.date ?? 0) - (b.time ?? 0));
  return response.content;
}

/**
 * @returns Promise containing the created `Time`.
 */
async function createOne(time: Time) {
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
async function updateOne(time: Partial<Time>) {
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
async function deleteOne(timeId: string) {
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
    get times() {
      return timesStore;
    },

    set,
    fetchUser,
    isLoggedIn,
    login,
    logout,

    time: {
      fetchOne,
      fetchMany,
      createOne,
      updateOne,
      deleteOne
    }
  };
}

export const user = createUserStore();
