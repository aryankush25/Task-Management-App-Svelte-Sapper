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

	return response
}

const getTasks = async () => {
	const url = 'tasks'
	const method = 'GET'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response
}

const getTask = async (taskId) => {
	const url = `tasks/${taskId}`
	const method = 'GET'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response
}

const updateTask = async (taskId, updatedData) => {
	const url = `tasks/${taskId}`
	const method = 'PATCH'

	const response = await request(url, method, { 'Content-Type': 'application/json' }, updatedData)

	return response
}

const deleteTask = async (taskId) => {
	const url = `tasks/${taskId}`
	const method = 'DELETE'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response
}

const tasksApi = {
	createTasks,
	getTasks,
	getTask,
	updateTask,
	deleteTask
}

export default tasksApi
