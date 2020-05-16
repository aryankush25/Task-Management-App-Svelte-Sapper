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

const setInitialValue = async () => {
	setIsLoading(true)

	const fetchTasksResponse = await apis.tasksApi.getTasks()

	setIsLoading(false)

	if (fetchTasksResponse.success) {
		tasksStore.update((tasksStoreObject) => {
			return {
				...tasksStoreObject,
				tasksArray: fetchTasksResponse.data
			}
		})
	}
}

const addTask = async (description, isCompleted) => {
	setIsLoading(true)

	const addTaskResponse = await apis.tasksApi.createTasks(description, isCompleted)

	setIsLoading(false)

	if (addTaskResponse.success) {
		tasksStore.update((tasksStoreObject) => {
			let updatedTasksArray = tasksStoreObject.tasksArray

			updatedTasksArray.push(addTaskResponse)

			return {
				...tasksStoreObject,
				tasksArray: updatedTasksArray
			}
		})
	}
}

const customTasksStore = {
	subscribe: tasksStore.subscribe,
	setInitialValue,
	addTask
}

export default customTasksStore
