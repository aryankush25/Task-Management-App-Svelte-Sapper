import validator from "validator";

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
  const errorMessage = isValid ? '' : 'Password must be greater than 8 letters'

  return {
    isValid,
    errorMessage
  }
}