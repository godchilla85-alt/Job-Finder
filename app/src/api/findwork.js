const API_URL = "/api-proxy/jobs/"; 


export async function fetchJobs(filters = {}) {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.location) params.append("location", filters.location);
  if (filters.sort) params.append("sort", filters.sort);
  if (filters.remote) params.append("remote", "true");


  const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;

  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${import.meta.env.VITE_FINDWORK_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data;
}