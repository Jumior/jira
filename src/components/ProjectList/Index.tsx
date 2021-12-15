import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { List } from "./List"
import { Search } from "./Search"
import { useHttp } from "../../utils/http";

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
    }, [debouncedParam])
    useMount(() => {
        client('users').then(setUsers)
    })
    return <div>
        <Search param={param} setParam={setParam} users={users} />
        <List list={list} users={users} />
    </div>
}