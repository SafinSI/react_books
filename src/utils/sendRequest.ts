export type Request = {
  url: string
  method?: "GET" | "POST" | "PATCH" | "PUT"
  body?: string
  errorHandler?: (err: string) => void
}

export function sendRequest<T>({ url, method = "GET", body, errorHandler }: Request): Promise<T> {
  const fetchParams = {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    ...(["POST", "PATCH", "PUT"].indexOf(method) > -1 && { body })
  }
  return fetch(url, fetchParams)
    .then((response) => {
      return response.ok ? response.json() : response.status
    })
    .catch((err) => errorHandler && errorHandler(err))
}
