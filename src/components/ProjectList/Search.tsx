import { Form, Input, Select } from "antd"

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}
interface SearchProps {
    users: User[];
    param: {
        name: string;
        personId: string
    };
    setParam: (param: SearchProps['param']) => void;
}
export const Search = ({ users, param, setParam }: SearchProps) => {
    return <Form layout="inline" style={{ marginBottom: '2rem' }}>
        <Form.Item style={{ marginRight: 0 }}>
            <Select value={param.personId} onChange={value => setParam({ ...param, personId: value })}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map((user: User) => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </Form.Item>
        <Form.Item>
            <Input placeholder="项目名" type="text" value={param.name} onChange={evt => setParam({ ...param, name: evt.target.value })} />
        </Form.Item>

    </Form>

}