const BASEURL = 'https://good-carango-api.herokuapp.com';
const BASEHEADER = { 'Content-Type': 'application/json' };
const api = (url, options) =>
  fetch(BASEURL + url, {
    ...options,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    headers: options?.headers
      ? { ...BASEHEADER, ...options.headers }
      : BASEHEADER,
  }).then(response => {
    if (!response.ok) {
      throw response;
    }

    if (response.status !== 204) {
      return response.json();
    }
  });

export default api;
