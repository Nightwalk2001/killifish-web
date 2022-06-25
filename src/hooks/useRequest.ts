// export const useRequest = <T>(promise: Promise<Response<T>>, immediate = true) => {
//     const [data, setData] = useState<T>()
//     const [pending, setPending] = useState<boolean>(false)
//     const [error, setError] = useState<ErrorState>()
//
//     const request = useCallback(
//         () => {
//             setPending(true)
//             setError(null)
//             return promise
//                 .then((response) => setData(response.data))
//                 .catch((error) => setError(error))
//                 .finally(() => setPending(false))
//         },
//         [promise],
//     )
//
//     useEffect(() => {
//         if (immediate) request().then()
//     }, [])
//
//     return {data, pending, error, mutate: request}
// }

import useSWR from "swr"

export {useSWR as useRequest}