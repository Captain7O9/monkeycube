import type { time, user } from '$lib/types';

const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch({
  endpoint,
  options = {},
  sendToken = false,
  excludedErrors = []
}: {
  endpoint: string;
  options?: RequestInit;
  sendToken?: boolean;
  excludedErrors?: number[];
}) {
  if (sendToken) {
    options.credentials = 'include';
  }

  const request = {
    ...options,
    headers: {
      ...options.headers
    }
  };

  const url = `${API_URL}${endpoint}`;
  console.log(`Fetching ${url} with options:`, request);

  const response = await fetch(url, request);

  if (excludedErrors.includes(response.status)) {
    return { content: null, status: response.status };
  } else if (response.ok) {
    return { content: await response.json(), status: response.status };
  } else {
    const error = await response.json();
    throw new Error(error.detail || 'Request failed');
  }
}

export async function login(username: string, password: string) {
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
}

export async function logout() {
  await apiFetch({
    endpoint: '/logout',
    options: { method: 'POST' },
    sendToken: true
  });
}

export async function fetchTimes(username: string): Promise<time[]> {
  const response = await apiFetch({ endpoint: `/users/${username}/times` });
  return response.content;
}

export async function fetchUser(): Promise<user | null> {
  const response = await apiFetch({ endpoint: '/users', sendToken: true, excludedErrors: [401] });
  return response.status === 401 ? null : response.content;
}
