import { APIError } from '../../errors/APIError'

import { delay } from '../../utils/delay'

export class HttpClient {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  get (path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers
    })
  }

  post (path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers
    })
  }

  put (path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers
    })
  }

  async makeRequest (path, options) {
    await delay()

    const headers = new Headers()

    if (options.body) {
      headers.append('Content-Type', 'application/json')
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value)
      })

      // Object.keys(options.headers).forEach((name) => {
      //   headers.append(name, options.headers[name])
      // })
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options?.method,
      body: JSON.stringify(options?.body),
      headers
    })

    const contentType = response.headers.get('Content-Type')

    let responseBody = null

    if (contentType.includes('application/json')) {
      responseBody = await response.json()
    }

    if (response.ok) {
      return responseBody
    }

    throw new APIError(response, responseBody)
  }
}
