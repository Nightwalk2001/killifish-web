export const sizes        = ["ALL", "1.5", "3", "10"],
             sexuals      = ["ALL", "male", "female"],
             pagesizes    = ["10", "28", "50", "100"],
             sorts        = ["None", "tank id:1", "tank id:-1", "size:1", "size:-1"],
             DEFAULT      = "ALL",
             DEFAULT_SORT = "None"

export const sortMap: { [p: string]: string } = {
    "tank id:1": "id:asc",
    "tank id:-1": "id:desc",
    "size:1": "size:asc",
    "size:-1": "size:desc"
}
