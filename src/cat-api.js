export function fetchCats(url) {
  return fetch(`${url}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  });
}

export function fetchCatByBreed(url, breedId) {
  return fetch(`${url}?breed_ids=${breedId}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
