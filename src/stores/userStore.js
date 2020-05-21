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

const updateUserData = async (userName, userAge) => {
	setIsLoading(true)

	const userDataResponse = await api.userApis.setCurrentUserApi(userName, userAge)

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

const updateAvatar = async (avatarUrl) => {
	const uploadMyAvatarResponse = await api.userApis.uploadMyAvatar(avatarUrl, 'User')

	if (uploadMyAvatarResponse.success) {
		userStore.update((userStoreObject) => {
			return {
				...userStoreObject,
				avatar: URL.createObjectURL(avatarUrl)
			}
		})
	}
}

const deleteAvatar = async () => {
	const deleteMyAvatarResponse = await api.userApis.deleteMyAvatar()

	if (deleteMyAvatarResponse.success) {
		userStore.update((userStoreObject) => {
			return {
				...userStoreObject,
				avatar: null
			}
		})
	}
}

const customUserStore = {
	subscribe: userStore.subscribe,
	isUserDataPresent,
	fetchAvatar,
	fetchUserData,
	updateUserData,
	updateAvatar,
	deleteAvatar
}

export default customUserStore
