import * as R from 'ramda'
import { isPresent } from '../../utils/helper'

export const setLocalStorageTokens = (tokens) => {
	const keys = R.keys(tokens)

	keys.forEach((key) => {
		const value = tokens[`${key}`]
		if (window) window.localStorage.setItem(key, value)
	})
}

export const getLocalStorageTokens = () => {
	let accessToken = null
	if (window) {
		accessToken = window.localStorage.getItem('accessToken') || ''
	}

	return {
		accessToken
	}
}

export const isTokensPresentLocalStorage = () => {
	const { accessToken } = getLocalStorageTokens()

	const isTokensUndefined = accessToken === 'undefined'

	return isPresent(accessToken) && !isTokensUndefined
}

export const clearLocalStorage = () => {
	if (window) window.localStorage.clear()
}
