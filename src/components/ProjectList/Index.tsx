import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { List } from "./List"
import { Search } from "./Search"
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

export const ProjectList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    const debouncedParam = useDebounce(param, 500)
    const client = useHttp()
    useEffect(() => {
        client('projects', {
            data: cleanObject(debouncedParam)
        }).then(setList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam])
    useMount(() => {
        client('users').then(setUsers)
    })
    return <Container>
        <h1>项目列表</h1>
        <Search param={param} setParam={setParam} users={users} />
        <List list={list} users={users} />
    </Container>
}

const Container = styled.div`
  padding:3.2rem;
`;