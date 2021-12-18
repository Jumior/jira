import qs from "qs"
import { logout } from "../auth-provider"
import { useAuth } from "../context/auth-context"

const BASE_URL = process.env.REACT_APP_API_URL
interface RequestConfig extends RequestInit {
    data?: object;
    token?: string;
}
export const http = async (url: string, { data, token, headers, ...customConfig }: RequestConfig = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        url += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    // axios和fetch的表现不一样，axios可以在返回状态不为2xx的时候抛出异常
    return fetch(`${BASE_URL}/${url}`, config)
        .then(async response => {
            if (response.status === 401) {
                await logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}
export const useHttp = () => {
    const { user } = useAuth()
    return (...[url, config]: Parameters<typeof http>) => http(url, { ...config, token: user?.token })
}
// ts utility type
// interface Person {
//     name: string;
//     age: number;
// }
// const a: Partial<Person> = {} //Partial 允许传入部分属性
// type PersonOnlyAge = Omit<Person, 'name'>//Omit 传入删除指定属性后的属性
// type PersonKeys = keyof Person
// type PersonOnlyName = Pick<Person, 'name'>//Pick 传入指定属性
// type Age = Exclude<PersonKeys, 'name'>