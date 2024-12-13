const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const loginAdmin = (email, password) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/users/login', {
    method: 'POST',
    body: JSON.stringify({ data: { email, password } }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const logoutAdmin = token => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/users/logout', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });

  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});

export const getProspectOtp = (prospect) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/prospects/otp', {
    method: 'POST',
    body: JSON.stringify({ prospect }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
