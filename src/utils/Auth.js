const baseUrl = "https://auth.nomoreparties.co/"

function checkRes (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`ERROR! => ${res.status}`)
  }
}

export const login = (email, password) => {
  return fetch(`$(baseURL)/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
})

  .then (checkRes)
  .then((data) => {
    if (data.jwt){
      localStorage.setItem('jwt', data.jwt);
      return data;
  }
})
}