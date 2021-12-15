import { User } from "./components/ProjectList/Search"
import { http } from "./utils/http"
const loaclStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(loaclStorageKey)

export const handlerUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(loaclStorageKey, user.token || '')
    return user
}

export const login = async (data: { username: string; password: string }) => {
    const result = await http('login', {
        method: 'POST',
        data
    })
    return handlerUserResponse(result)
}

export const register = async (data: { username: string; password: string }) => {
    const result = await http('register', {
        method: 'POST',
        data
    })
    return handlerUserResponse(result)
}

export const logout = async () => window.localStorage.removeItem(loaclStorageKey)