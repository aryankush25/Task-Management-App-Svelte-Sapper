import * as R from 'ramda'

const BASE_URL = 'https://shielded-anchorage-68629.herokuapp.com/'

const request = async (url, method, header, body) => {
  var myHeaders = new Headers()
  const headerKeys = R.keys(header)

  myHeaders.append('Accept', '*/*')

  headerKeys.forEach((headerKey) => {
    myHeaders.append(headerKey, header[headerKey])
  })

  var raw = JSON.stringify(body)

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw,
  }

  const response = fetch(BASE_URL + url, requestOptions)
    .then((response) => {
      console.info(`Response of ${url}`, response)

      if (response.ok) {
        return response.json()
      }

      throw new Error({
        status: response.status,
        statusText: response.statusText,
      })
    })
    .then((result) => {
      console.info(`Result of ${url}`, result)

      return {
        success: true,
        data: result,
      }
    })
    .catch((error) => {
      console.error(`Error of ${url}`, error)

      return {
        success: false,
        error: error,
      }
    })

  return response
}

export default request
