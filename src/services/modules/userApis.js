import * as R from 'ramda'
import request from '../request'
import { isPresent } from '../../utils/helper'
import { setLocalStorageTokens, clearLocalStorage } from '../utils/helper'

const loginUserApi = async (email, password) => {
	const url = 'users/login'
	const method = 'POST'

	const response = await request(
		url,
		method,
		{ 'Content-Type': 'application/json' },
		{
			email: email,
			password: password
		},
		true
	)

	const token = R.pathOr('', ['data', 'token'], response)

	if (response.success && isPresent(token)) {
		setLocalStorageTokens({
			accessToken: token
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
			password: password
		},
		true
	)

	const token = R.pathOr('', ['data', 'token'], response)

	if (response.success && isPresent(token)) {
		setLocalStorageTokens({
			accessToken: token
		})
	}

	return response
}

const logoutCurrentUser = async () => {
	const url = 'users/logout'
	const method = 'POST'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	if (response.success) {
		clearLocalStorage()
	}

	return response
}

const logoutAllUser = async () => {
	const url = 'users/logoutAll'
	const method = 'POST'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	if (response.success) {
		clearLocalStorage()
	}

	return response
}

const getCurrentUserApi = async () => {
	const url = 'users/me'
	const method = 'GET'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response
}

const getMyAvatar = async () => {
	const url = 'user/me/avatar'
	const method = 'GET'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response
}

const deleteMyAccount = async () => {
	const url = 'user/me'
	const method = 'DELETE'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response
}

const userApis = {
	loginUserApi,
	registerUserApi,
	logoutCurrentUser,
	logoutAllUser,
	getCurrentUserApi,
	getMyAvatar,
	deleteMyAccount
}

export default userApis
