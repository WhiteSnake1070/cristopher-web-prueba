const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const processPayment = (token, payment) => new Promise((resolve, reject) => {
  const request = new Request(NEXT_PUBLIC_API_BASE_URL + '/payments', {
    method: 'POST',
    body: JSON.stringify({ payment }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
