import request from '../request'

const createTasks = async (description, completed) => {
	const url = 'tasks'
	const method = 'POST'

	const response = await request(
		url,
		method,
		{ 'Content-Type': 'application/json' },
		{
			description,
			completed
		}
	)

	return response.data
}

const getTasks = async () => {
	const url = 'tasks'
	const method = 'GET'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response.data
}

const getTask = async (taskId) => {
	const url = `tasks/${taskId}`
	const method = 'GET'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response.data
}

const updateTask = async (taskId, updatedData) => {
	const url = `tasks/${taskId}`
	const method = 'PATCH'

	const response = await request(url, method, { 'Content-Type': 'application/json' }, updatedData)

	return response.data
}

const deleteTask = async (taskId) => {
	const url = `tasks/${taskId}`
	const method = 'DELETE'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response.data
}

const tasksApi = {
	createTasks,
	getTasks,
	getTask,
	updateTask,
	deleteTask
}

export default tasksApi
