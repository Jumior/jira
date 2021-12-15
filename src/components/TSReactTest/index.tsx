import { useArray } from "../../utils"
export interface Person {
    name: string;
    age: number;
}
export const TSReactTest = () => {
    const persons: Person[] = [{
        name: 'Jack',
        age: 22
    }, {
        name: 'Ma',
        age: 25
    }]
    const { value, clear, removeIndex, add } = useArray(persons)
    return (
        <div>
            <button onClick={() => add({
                name: 'John',
                age: 27
            })}>add John</button>
            <button onClick={() => removeIndex(0)}>remove 0</button>
            <button style={{ marginBottom: '50px' }} onClick={() => clear()}>clear</button>
            {
                value.map((person: Person, index: number) =>
                    <div style={{ marginBottom: '30px' }}>
                        <span style={{ color: 'red' }}>{index}</span>
                        <span>{person.name}</span>
                        <span>{person.age}</span>
                    </div>
                )
            }
        </div>
    )
}