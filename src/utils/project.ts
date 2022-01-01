import { useEffect } from "react";
import { cleanObject } from ".";
import { Project } from "../components/ProjectList/List";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<Project[]>()
    useEffect(() => {
        run(client('projects', {
            data: cleanObject(param || {})
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result
};