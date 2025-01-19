const API_URL = import.meta.env.VITE_API_URL;

export function convertTime(tineInMilliseconds: number): {
  minutes: number;
  seconds: number;
  milliseconds: number;
} {
  const minutes = Math.floor(tineInMilliseconds / 60000);
  const seconds = Math.floor((tineInMilliseconds % 60000) / 1000);
  const milliseconds = tineInMilliseconds % 1000;
  return { minutes, seconds, milliseconds };
}

export function formatTime(timeInMilliseconds: number): string {
  const { minutes, seconds, milliseconds } = convertTime(timeInMilliseconds);
  const decimals = milliseconds.toString().padEnd(3, '0');

  const displaySeconds = minutes > 0 ? seconds.toString().padStart(2, '0') : seconds;
  return `${minutes > 0 ? minutes : ''}${minutes > 0 ? ':' : ''}${displaySeconds}.${decimals}`;
}

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
