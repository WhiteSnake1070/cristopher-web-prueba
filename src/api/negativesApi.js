const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const getNegatives = (token, employeeId, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/employees/${employeeId}/negatives?${queryParams}`, {
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

export const getNegative = (token, employeeId, negativeId) => new Promise((resolve, reject) => {
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/employees/${employeeId}/negatives/${negativeId}`, {
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

export const createNegative = (token, employeeId, negative) => new Promise((resolve, reject) => {
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/employees/${employeeId}/negatives`, {
    method: 'POST',
    body: JSON.stringify({ negative }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const updateNegative = (token, employeeId, negativeId, negative) => new Promise((resolve, reject) => {
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/employees/${employeeId}/negatives/${negativeId}`, {
    method: 'PUT',
    body: JSON.stringify({ negative }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
