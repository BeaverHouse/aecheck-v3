export const fetchAPI = async (endpoint: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`);
  if (res.ok) {
    return await res.json();
  }
  return null;
};
