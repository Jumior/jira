import { useEffect } from "react";
import { cleanObject } from ".";
import { Project } from "../components/ProjectList/List";
import { User } from "../components/ProjectList/Search";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<User[]>()
    useEffect(() => {
        run(client('users', {
            data: cleanObject(param || {})
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
};