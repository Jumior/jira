import { Table, TableProps } from "antd"
import dayjs from "dayjs"
import { User } from "./Search"

export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[];
}

export const List = ({ users, ...params }: ListProps) => {
    const columns = [{
        title: "名称",
        dataIndex: "name"
    }, {
        title: "部门",
        dataIndex: "organization"
    }, {
        title: "负责人",
        render(_value: ListProps, project: Project) {
            return <span>
                {users.find(user => user.id === project.personId)?.name || '未知'}
            </span>
        }
    }, {
        title: "创建时间",
        render(_value: ListProps, project: Project) {
            return <span>
                {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
            </span>
        }
    }]
    return <Table rowKey="id" pagination={false} columns={columns} {...params} />

}

