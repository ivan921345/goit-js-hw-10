export function createSelectMarkup(arr) {
  return arr
    .map(
      cat =>
        `
		 <option value="${cat.id}">${cat.name}</option>
	 `
    )
    .join('');
}

export function createCatInfoMarkup({
  catImage,
  description,
  temperament,
  catName,
}) {
  return `
    <img src="${catImage}" alt="${catName}">
    <h2 class="name">${catName}</h2>
      <p class="desc">${description}</p>
      <h3 class="temperament">Temperament</h3>
    <p class="temperamentDesc">${temperament}</p>
  `;
}
