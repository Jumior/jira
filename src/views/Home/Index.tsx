import styled from "@emotion/styled";
import { ProjectList } from "../../components/ProjectList/Index";
import { Row } from "../../components/Styles/lib";
import { useAuth } from "../../context/auth-context";
import { ReactComponent as SoftwareLogo } from "../../assets/svg/software-logo.svg"
import { Button, Dropdown, Menu } from "antd";


export const Home = () => {
    const { user, logout } = useAuth()
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width="18rem" color="rbg(38,132,255)" />
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key={'logout'}>
                                <Button type="link" onClick={logout}>登出</Button>
                            </Menu.Item>
                        </Menu>}
                    >
                        <Button type="link" onClick={evt => evt.preventDefault()}>Hi，{user?.name}</Button>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectList />
            </Main>
        </Container>
    )
}
// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding:3.2rem;
  box-shadow:0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index:1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
`;

