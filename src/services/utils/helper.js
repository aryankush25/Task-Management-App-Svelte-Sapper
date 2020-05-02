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
  const refreshToken = window.localStorage.getItem('refreshToken') || ''

  return {
    accessToken,
    refreshToken,
  }
}

export const isTokensPresentLocalStorage = () => {
  const { accessToken, refreshToken } = getLocalStorageTokens()

  const isTokensUndefined =
    accessToken === 'undefined' || refreshToken === 'undefined'

  return isPresent(accessToken) && isPresent(refreshToken) && !isTokensUndefined
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
