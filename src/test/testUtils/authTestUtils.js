// import fetch from 'node-fetch'

// export const CLIENT_ID = 'qI0Za5M5uh21EZBjFBepQV09FFue4F9R'

// export const getTemporaryToken = async (options = { shouldFail: false}) => {
//   if (options.shouldFail)
//     return errorToken

//   const response = await fetch('https://bar-code.eu.auth0.com/oauth/token', {
//     method: 'post',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify(body),
//   })
//   const tokenResponse = await response.json()
  
//   return tokenResponse.token_type + ' ' + tokenResponse.access_token
// }

// const body = {
//   client_id: CLIENT_ID,
//   client_secret: 'vpRxXCnrsRj9kWT5T26nzHyOk-WxWkHCz7kQiAwAcqEbv0MMU7PCNtYcmeM3iOMX',
//   audience: 'bar-code.ga',
//   grant_type: 'client_credentials'
// }

export const authToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijkxcl9hYkwtenV3SmxBd0QzcEpmcCJ9.eyJpc3MiOiJodHRwczovL3RlbXBsYXRlLXNoYXJlZC1lY29ub215LWJlLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxSTBaYTVNNXVoMjFFWkJqRkJlcFFWMDlGRnVlNEY5UkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90ZW1wbGF0ZS1zaGFyZWQtZWNvbm9teS1iZS1kZXYiLCJpYXQiOjE2MTg3Nzc2MzYsImV4cCI6MTYxODg2NDAzNiwiYXpwIjoicUkwWmE1TTV1aDIxRVpCakZCZXBRVjA5RkZ1ZTRGOVIiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.RqKNVOPZXyQWhxYkalw7gFOHnduqy8NOnKUkvrYjJwMTUBLa-F13MnbEGY1pDfiQ1OUmQ6BX12KSDjY_1hO_-E_pzBwYAH_ymQ88ITXfa7QY6hBpGLSAbnhZHuhJJlwMtM1Hx6MIyxFr3vLnRsF5SM5-jrVn8VjRVwdterphC27SPrlJ1UdLfW9V5GM6x3NxWjZM2BcWfKXLzpWQU5Vc803aQWNkisaNVwwXZQwFOV1QzLXlJaK-4h4_N6dD_KQSgG5KTR5I9FmKF45Jhr2Hjoo7L0gFhIK9NHA36ak4FisZhqcxuLEt9y1Hnt4IvdXKAIdIZvcapKrHSSqi2JXQLw'