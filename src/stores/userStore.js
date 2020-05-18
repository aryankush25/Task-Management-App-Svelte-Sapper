import { writable } from 'svelte/store'
import * as R from 'ramda'
import api from '../services'

const initialValue = {
	isLoading: false,
	name: null,
	age: null,
	email: null,
	avatar: null
}

const userStore = writable(initialValue)

const isUserDataPresent = () => {
	let isUserDataComplete = false

	const unsubscribe = userStore.subscribe((userStoreObject) => {
		const { name, age, email, avatar } = userStoreObject

		const isNameNil = R.isNil(name)
		const isAgeNil = R.isNil(age)
		const isEmailNil = R.isNil(email)
		const isAvatarNil = R.isNil(avatar)

		if (isNameNil && isAgeNil && isEmailNil && isAvatarNil) {
			isUserDataComplete = false
		} else {
			isUserDataComplete = true
		}
	})

	unsubscribe()

	return isUserDataComplete
}

const setIsLoading = (isLoading) => {
	userStore.update((userStoreObject) => {
		return {
			...userStoreObject,
			isLoading
		}
	})
}

const fetchAvatar = async () => {
	const userAvatarResponse = await api.userApis.getMyAvatar()

	if (userAvatarResponse.success) {
		userStore.update((userStoreObject) => {
			return {
				...userStoreObject,
				avatar: userAvatarResponse.data || ''
			}
		})
	}
}

const fetchUserData = async () => {
	setIsLoading(true)

	const userDataResponse = await api.userApis.getCurrentUserApi()

	setIsLoading(false)

	if (userDataResponse.success) {
		const { age, email, name } = userDataResponse.data

		userStore.update((userStoreObject) => {
			return {
				...userStoreObject,
				age,
				email,
				name
			}
		})
	}
}

const customUserStore = {
	subscribe: userStore.subscribe,
	isUserDataPresent,
	fetchAvatar,
	fetchUserData
}

export default customUserStore
