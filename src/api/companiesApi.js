const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const getCompanies = (token, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/companies?' + queryParams, {
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

export const getCompany = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/companies/' + id, {
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

export const createCompany = (token, company) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/companies', {
    method: 'POST',
    body: JSON.stringify({ company }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const updateCompany = (token, id, company) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/companies/' + id, {
    method: 'PUT',
    body: JSON.stringify({ company }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
