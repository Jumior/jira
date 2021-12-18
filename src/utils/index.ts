import {
    useState,
    useEffect
} from "react";
/**
 * @description 判断0
 * @param {*} param 
 * @returns 
 */
export const isFalsy = (param: unknown) => param === 0 ? false : !param

/**
 * @description 判断void
 * @param param 
 * @returns
 */
 export const isVoid = (param: unknown) => param === undefined || param === null || param === ''

/**
 * @description 清除对象内为false的属性
 * @param {*} object 
 * @returns
 */
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = Object.assign({}, object)
    for (const key in result) {
        if (Object.hasOwnProperty.call(result, key)) {
            const element = result[key];
            if (isVoid(element)) {
                delete result[key]
            }
        }
    }
    return result
}
/**
 * @description 自定义hook useMount
 * @param {*} effect 
 * @param {*} cleanup 
 */
export const useMount = (effect: () => void, cleanup?: () => void) => {
    useEffect(() => {
        effect()
        return () => {
            cleanup && cleanup()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
/**
 * @description 自定义hook useDebounce
 * @param {*} value 
 * @param {*} delay 
 * @returns 
 */
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])
    return debounceValue
}
/**
 * @description 自定义hook useArray
 * @param initialArray 
 * @returns 
 */
export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const result = [...value]
            result.splice(index, 1)
            setValue(result)
        }
    }
}