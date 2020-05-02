import * as R from 'ramda'
import request from './request'

export const loginUser = async (email, password) => {
  const url = 'users/login'
  const method = 'POST'

  const response = await request(
    url,
    method,
    { 'Content-Type': 'application/json' },
    {
      email: email,
      password: password,
    }
  )

  console.log('response', response)

  return response
}
