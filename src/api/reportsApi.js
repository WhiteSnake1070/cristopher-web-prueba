const { REACT_APP_API_BASE_URL } = process.env;

export const getReports = (token, employmentId, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  
  const request = new Request(`${REACT_APP_API_BASE_URL}/employments/${employmentId}/reports?${queryParams}`, {
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

export const getReport = (token, employmentId, id) => new Promise((resolve, reject) => {
  const request = new Request(`${REACT_APP_API_BASE_URL}/employments/${employmentId}/reports/${id}`, {
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

export const createReport = (token, employmentId, report) => new Promise((resolve, reject) => {
  const request = new Request(`${REACT_APP_API_BASE_URL}/employments/${employmentId}/reports`, {
    method: 'POST',
    body: JSON.stringify({ report }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const updateReport = (token, employmentId, id, report) => new Promise((resolve, reject) => {
  const request = new Request(`${REACT_APP_API_BASE_URL}/employments/${employmentId}/reports/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ report }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
