declare type Role = "manager" | "normal"

declare type Person = {
    name: string
    password: string
    email: string
    role: Role
    tankCount?: number
    label?: string
    tags?: string[]
}
