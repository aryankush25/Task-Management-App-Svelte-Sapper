import * as R from 'ramda'
import request from '../request'
import { isPresent } from '../../utils/helper'
import { setLocalStorageTokens } from '../utils/helper'

const loginUserApi = async (email, password) => {
  const url = 'users/login'
  const method = 'POST'

  const response = await request(
    url,
    method,
    { 'Content-Type': 'application/json' },
    {
      email: email,
      password: password,
    },
    true
  )

  const token = R.pathOr('', ['data', 'token'], response)

  if (response.success && isPresent(token)) {
    setLocalStorageTokens({
      accessToken: token,
    })
  }

  return response
}

const registerUserApi = async (name, email, password) => {
  const url = 'users'
  const method = 'POST'

  const response = await request(
    url,
    method,
    { 'Content-Type': 'application/json' },
    {
      name: name,
      email: email,
      password: password,
    },
    true
  )

  const token = R.pathOr('', ['data', 'token'], response)

  if (response.success && isPresent(token)) {
    setLocalStorageTokens({
      accessToken: token,
    })
  }

  return response
}

const userApis = {
  loginUserApi,
  registerUserApi,
}

export default userApis
