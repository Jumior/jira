import { useState } from "react"
import { useAuth } from "../../context/auth-context"
import { Button, Card, Divider, Form, Input } from "antd"
import styled from "@emotion/styled"
import logo from "../../assets/svg/logo.svg"
import left from "../../assets/svg/left.svg"
import right from "../../assets/svg/right.svg"

export const Login = () => {
    const [isRegister, setIsRegister] = useState(false)
    const { login, register } = useAuth()
    const handleSubmit = (values: { username: string; password: string; }) => {
        if (isRegister) {
            register(values)
            return
        }
        login(values)
    }
    return (
        <Container>
            <Header />
            <BackGround />
            <ShadowCard>
                <Title>
                    {isRegister ? '请注册' : '请登录'}
                </Title>

                <Form onFinish={handleSubmit}>
                    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input placeholder="用户名" type="text" id="username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input placeholder="密码" type="password" id="password" />
                    </Form.Item>
                    <Form.Item>
                        <LongButton style={{ marginRight: 30 }} htmlType="submit" type="primary">{isRegister ? '注册' : '登录'}</LongButton>
                    </Form.Item>
                    <Divider />
                    <Button onClick={() => setIsRegister(!isRegister)} type="link">{isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}</Button>
                </Form>
            </ShadowCard>
        </Container>
    )
}

export const LongButton = styled(Button)`
  width:100%;
`

const Header = styled.header`
  background:url(${logo}) no-repeat center;
  padding:5rem 0;
  background-size:8rem;
  width:100%;
`
const Title = styled.h2`
   margin-bottom:2.4rem;
   color:rgb(94, 108 ,32);
`
const BackGround = styled.div`
   position:absolute;
   width:100%;
   height:100%;
   background-repeat:no-repeat;
   background-attachment:fixed;
   background-position: left bottom, right bottom;
   background-size:calc(((100vw - 40rem) / 2 ) - 3.2rem), calc(((100vw - 40rem) / 2 ) - 3.2rem), cover;
   background-image:url(${left}), url(${right});
`
const ShadowCard = styled(Card)`
   width:40rem;
   min-height:45rem;
   border-radius:0.3rem;
   padding:3.2rem 4rem;
   box-shadow:rgba(0, 0, 0, 0.1) 0 0 10px;
   text-align:center;
`
const Container = styled.div`
   display:flex;
   align-items:center;
   flex-direction:column;
   min-height:100vh;
`