import { useState } from "react";
import { useDebounce } from "../../utils";
import { List } from "./List"
import { Search } from "./Search"
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/users";

export const ProjectList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 500)
    const { isLoading, error, data: list } = useProjects(debouncedParam)
    const { data: users } = useUsers()
    return <Container>
        <h1>项目列表</h1>
        <Search param={param} setParam={setParam} users={users || []} />
        {error && <Typography.Text type="danger">{error.message}</Typography.Text>}
        <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
}

const Container = styled.div`
  padding:3.2rem;
`;