const BASE_URL = 'https://frontend-take-home-service.fetch.com';

export const fetchBreeds = async () => {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, { credentials: 'include' });
  return response.json();
};

export const fetchDogs = async (breed, sortOrder, page, pageSize) => {
  const params = new URLSearchParams({
    breeds: breed,
    sort: sortOrder,
    size: pageSize,
    from: (page - 1) * pageSize,
  });
  const response = await fetch(`${BASE_URL}/dogs/search?${params}`, { credentials: 'include' });
  const { resultIds, total } = await response.json();
  const dogsResponse = await fetch(`${BASE_URL}/dogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resultIds),
    credentials: 'include',
  });
  const dogs = await dogsResponse.json();
  return { dogs, total };
};

export const fetchMatch = async (favoriteIds) => {
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(favoriteIds),
    credentials: 'include',
  });
  const { match } = await response.json();
  const dogResponse = await fetch(`${BASE_URL}/dogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([match]),
    credentials: 'include',
  });
  const [matchedDog] = await dogResponse.json();
  return matchedDog;
};