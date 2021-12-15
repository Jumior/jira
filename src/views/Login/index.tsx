import { FormEvent, useState } from "react"
import { useAuth } from "../../context/auth-context"

export const Login = () => {
    const [isRegister, setIsRegister] = useState(false)
    const { user, login, register } = useAuth()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        if (isRegister) {
            register({ username, password })
            return
        }
        login({ username, password })
    }
    return (
        <form onSubmit={handleSubmit}>
            {user && <div>
                {isRegister ? '注册' : '登录'}成功，用户名{user.name}</div>}
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id={'username'} />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id={'username'} />
            </div>
            <button type="submit">{isRegister ? '注册' : '登录'}</button>
            <button type="button" onClick={() => setIsRegister(!isRegister)}>{isRegister ? '返回登录' : '进行注册'}</button>
        </form>
    )
}