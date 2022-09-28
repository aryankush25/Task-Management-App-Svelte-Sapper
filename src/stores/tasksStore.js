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
	const addTaskResponse = await apis.tasksApi.createTasks(description, isCompleted)

	if (addTaskResponse.success) {
		tasksStore.update((tasksStoreObject) => {
			let updatedTasksArray = tasksStoreObject.tasksArray

			updatedTasksArray.push(addTaskResponse.data)

			return {
				...tasksStoreObject,
				tasksArray: updatedTasksArray
			}
		})
	}
}

const removeTask = async (id) => {
	const deleteTaskResponse = await apis.tasksApi.deleteTask(id)

	if (deleteTaskResponse.success) {
		tasksStore.update((tasksStoreObject) => {
			let updatedTasksArray = tasksStoreObject.tasksArray.filter((task) => task._id !== id)

			return {
				...tasksStoreObject,
				tasksArray: updatedTasksArray
			}
		})
	}
}

const updateTask = async (id, updatedData) => {
	const updatedTaskResponse = await apis.tasksApi.updateTask(id, updatedData)

	if (updatedTaskResponse.success) {
		tasksStore.update((tasksStoreObject) => {
			let updatedTasksArray = tasksStoreObject.tasksArray.map((task) => {
				if (task._id === id) {
					return updatedTaskResponse.data
				}
				return task
			})

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
	addTask,
	removeTask,
	updateTask
}

export default customTasksStore
