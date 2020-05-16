import { writable } from 'svelte/store'
import apis from '../services'

const initialValue = { tasksArray: [], isLoading: false }

const tasksStore = writable(initialValue)

const setIsLoading = (isLoading) => {
	tasksStore.update((tasksStoreObject) => {
		return {
			...tasksStoreObject,
			isLoading
		}
	})
}

const setTasksArray = (tasksArray) => {
	tasksStore.update((tasksStoreObject) => {
		return {
			...tasksStoreObject,
			tasksArray
		}
	})
}

const setInitialValue = async () => {
	setIsLoading(true)

	const response = await apis.tasksApi.getTasks()

	setIsLoading(false)
	setTasksArray(response)
}

const customTasksStore = {
	subscribe: tasksStore.subscribe,
	setInitialValue
}

export default customTasksStore
