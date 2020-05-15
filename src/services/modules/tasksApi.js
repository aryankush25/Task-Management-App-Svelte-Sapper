import request from '../request'

const getTasks = async () => {
	const url = 'tasks'
	const method = 'GET'

	const response = await request(url, method, { 'Content-Type': 'application/json' })

	return response.data
}

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

const tasksApi = {
	getTasks,
	createTasks
}

export default tasksApi
