import validator from 'validator'

export const emptyValidator = (value) => {
	const isValid = validator.isLength(value, { min: 1 })
	const errorMessage = isValid ? '' : 'Please provide some value'

	return {
		isValid,
		errorMessage
	}
}

export const nameValidator = (name) => {
	const isValid = validator.isLength(name, { min: 3 })
	const errorMessage = isValid ? '' : 'Name too short'

	return {
		isValid,
		errorMessage
	}
}

export const emailValidator = (email) => {
	const isValid = validator.isEmail(email)
	const errorMessage = isValid ? '' : 'Not a valid email'

	return {
		isValid,
		errorMessage
	}
}

export const passwordValidator = (password) => {
	const isValid = validator.isLength(password, { min: 8 })
	const errorMessage = isValid ? '' : 'Password must be at least 8 characters'

	return {
		isValid,
		errorMessage
	}
}

export const confirmPasswordValidator = (password, confirmPassword) => {
	const isValid = validator.equals(password, confirmPassword) && validator.isLength(confirmPassword, { min: 8 })
	const errorMessage = isValid ? '' : "Password didn't match"

	return {
		isValid,
		errorMessage
	}
}
