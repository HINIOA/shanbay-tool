export function bayFetch(url: string, config?: RequestInit) {
  if (config && config.body) {
    config.body = JSON.stringify(config.body)
  }

  return fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    ...config
  }).then((res) => res.json())
}

export const getUserInfo = () =>
  bayFetch("https://apiv3.shanbay.com/bayuser/user")
