const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const getBundles = (token, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/bundles?' + queryParams, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const getBundle = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/bundles/' + id, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const createBundle = (token, bundle) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/bundles', {
    method: 'POST',
    body: JSON.stringify({ bundle }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const updateBundle = (token, id, bundle) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/bundles/' + id, {
    method: 'PUT',
    body: JSON.stringify({ bundle }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const uploadBundleImage = (token, id, image) => new Promise((resolve, reject) => {
  const data = new FormData();
  data.append('image', image);

  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/bundles/${id}/image`, {
    method: 'PUT',
    body: data,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
