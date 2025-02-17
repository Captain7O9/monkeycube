import type { Time } from '$lib/server/db/schema';

export const QUERIES = {
  getTimes: async function (limit: number, since: number): Promise<Time[]> {
    try {
      const response = await fetch(`/api/times?limit=${limit}&since=${since}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch times');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching times:', error);
      return [];
    }
  },

  postTime: async function (time: number, scramble: string, event: string): Promise<Time | null> {
    try {
      const response = await fetch(`/api/times`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          time: time,
          scramble: scramble,
          event: event
        })
      });

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  patchTime: async function (timeId: number, body: object): Promise<Time | null> {
    try {
      const response = await fetch(`/api/times/${timeId}`, {
        method: 'PATCH',
        headers: {
          'Application-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch times');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching times:', error);
      return null;
    }
  },

  deleteTime: async function (timeId: number): Promise<Time | null> {
    try {
      const response = await fetch(`/api/times/${timeId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch times');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching times:', error);
      return null;
    }
  }
};
