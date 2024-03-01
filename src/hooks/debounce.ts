import {useEffect, useState} from "react";

export const useDebounce = (currentValue: string, delay: number = 500) => {
    const [value, setValue] = useState(currentValue);
    useEffect(() => {
        const timer = setTimeout(() => setValue(currentValue), delay);
        return () => clearTimeout(timer);
    }, [currentValue])
    return value
}