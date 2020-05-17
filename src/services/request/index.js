import * as R from 'ramda'
import { getLocalStorageTokens, clearLocalStorage } from '../utils/helper'
import { isNilOrEmpty } from '../../utils/helper'

const BASE_URL = 'https://shielded-anchorage-68629.herokuapp.com/'

const request = async (url, method, header, body, noAuth) => {
	var myHeaders = {}
	const headerKeys = R.keys(header)

	myHeaders = R.assoc('Accept', '*/*', myHeaders)

	if (isNilOrEmpty(noAuth)) {
		const { accessToken } = getLocalStorageTokens()

		myHeaders = R.assoc('Authorization', `Bearer ${accessToken}`, myHeaders)
	}

	headerKeys.forEach((headerKey) => {
		myHeaders = R.assoc(headerKey, header[headerKey], myHeaders)
	})

	var raw = JSON.stringify(body)

	var requestOptions = {
		method: method,
		headers: myHeaders,
		body: raw
	}

	const response = fetch(BASE_URL + url, requestOptions)
		.then((response) => {
			// console.info(`Response of ${url}`, response)

			if (response.ok) {
				return response.json()
			}

			if (response.status === 401) {
				clearLocalStorage()
				window.location.replace('/login')
			}

			throw new Error({
				status: response.status,
				statusText: response.statusText
			})
		})
		.then((result) => {
			// console.info(`Result of ${url}`, result)

			return {
				success: true,
				data: result
			}
		})
		.catch((error) => {
			// console.error(`Error of ${url}`, error)

			return {
				success: false,
				error: error
			}
		})

	return response
}

export default request
