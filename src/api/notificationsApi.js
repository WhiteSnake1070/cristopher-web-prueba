const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const getNotifications = (token, query) => new Promise((resolve, reject) => {
  const queryParams = new URLSearchParams({
    results: 10,
    ...query
  }).toString();
  
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/notifications?' + queryParams, {
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

export const getNotification = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/notifications/' + id, {
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

export const readNotification = (token, id) => new Promise((resolve, reject) => {
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/notifications/${id}/read`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
