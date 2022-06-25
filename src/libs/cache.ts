// import {Store} from "tauri-plugin-store-api"
//
// const store = new Store(".killifish.dat")
//
// export {store}
export const persist = (key:string,value:any) => localStorage.setItem(key,JSON.stringify(value))

export const exists = (key:string) => !!localStorage.getItem(key)

export const getValue = <T>(key:string) => {
    const value = localStorage.getItem(key)

    return value!=null ? JSON.parse(value) as T : null
}

export const remove = (key:string) => localStorage.removeItem(key)
