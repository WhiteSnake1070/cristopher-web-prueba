const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const getEmployeeByIdentityNumber = (token, identityNumber) => new Promise((resolve, reject) => {
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/employees/q/${identityNumber}`, {
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

export const getEmployeeByIdentityNumberAndPin = (otp, identityNumber, pin) => new Promise((resolve, reject) => {
  const request = new Request(`${NEXT_PUBLIC_API_BASE_URL}/employees/open/${identityNumber}?pin=${pin}`, {
    method: 'GET',
    headers: {
      'x-cristopher-otp': otp,
      'Content-Type': 'application/json'
    }
  });
  fetch(request)
  .then(response => resolve(response))
  .catch(err => reject(err))
});
