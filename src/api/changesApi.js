const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const getChanges = (token, employeeId, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/employees/${employeeId}/changes?${queryParams}`, {
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

export const getChange = (token, employeeId, changeId) => new Promise((resolve, reject) => {
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/employees/${employeeId}/changes/${changeId}`, {
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
