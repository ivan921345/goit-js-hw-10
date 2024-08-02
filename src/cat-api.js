import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '500px',
  cssAnimationStyle: 'zoom',
  closeButton: true,
  clickToClose: true,
});

export async function fetchBreeds(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong please try again');
  }
}

export async function getCatImage(moreInfoUrl) {
  try {
    const resp = await fetch(moreInfoUrl);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const dataObj = await resp.json();
    const { url } = dataObj[0];
    return url;
  } catch (error) {
    Notiflix.Notify.failure('Cant get Image of cat, please try again');
  }
}
