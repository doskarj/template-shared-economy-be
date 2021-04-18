import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import consts from '../utils/consts'

const client = jwksClient({
  jwksUri: `https://${consts.auth.AUTH0_DOMAIN}/.well-known/jwks.json`
})

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(error, key) {
    // TODO: Log this error somewhere
    const signingKey = key.publicRsaKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

async function isTokenValid(token) {
  const bearerToken = token.split(' ')

  const result = new Promise(resolve => {
    jwt.verify(
      bearerToken[1],
      getKey,
      {
        audience: consts.auth.API_IDENTIFIER,
        issuer: `https://${consts.auth.AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
      },
      (error, decoded) => {
        if (error) {
          resolve({ error })
        }
        if (decoded) {
          resolve({ decoded })
        }
      }
    )
  })

  return result
}

const isAuthenticated = async (context) => {
  const token = context.headers.authorization
  if (!token) return false

  return await isTokenValid(token)
}
const handleNotAuthenticated = () => {
  // TODO: Log this somewhere
  throw new Error('Unauthorized operation.')
}

export default {
  isAuthenticated,
  handleNotAuthenticated
}