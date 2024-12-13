const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const getEmployments = (token, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/employments?' + queryParams, {
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

export const getEmployment = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/employments/' + id, {
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

export const createEmployment = (token, employee) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/employments', {
    method: 'POST',
    body: JSON.stringify({ employee }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const updateEmployment = (token, id, employee) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/employments/' + id, {
    method: 'PUT',
    body: JSON.stringify({ employee }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
