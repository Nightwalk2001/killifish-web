import {useLayoutEffect, useRef} from "react"

type Function = (...args: any[]) => any

export const useEvent = <T extends Function>(callback: T): T => {
    const stableRef = useRef<T>(null as any)
    const latestRef = useRef<T>(useEventShouldNotBeInvokedBeforeMount as any)

    useLayoutEffect(() => {
        latestRef.current = callback
    }, [callback])

    if (!stableRef.current)
        stableRef.current = function (this: any) {
            return latestRef.current.apply(this, arguments as any)
        } as T


    return stableRef.current
}

const useEventShouldNotBeInvokedBeforeMount = () => {
    throw new Error(
        "INVALID_USEEVENT_INVOCATION: the callback from useEvent cannot be invoked before the component has mounted."
    )
}
