import * as R from 'ramda'
import { isPresent } from '../../utils/helper'

export const setLocalStorageTokens = (tokens) => {
  const keys = R.keys(tokens)

  keys.forEach((key) => {
    const value = tokens[`${key}`]
    window.localStorage.setItem(key, value)
  })
}

export const getLocalStorageTokens = () => {
  const accessToken = window.localStorage.getItem('accessToken') || ''

  return {
    accessToken,
  }
}

export const isTokensPresentLocalStorage = () => {
  const { accessToken } = getLocalStorageTokens()

  const isTokensUndefined = accessToken === 'undefined'

  return isPresent(accessToken) && !isTokensUndefined
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
