export const excludeUnset = (source: object) => {
    return Object.fromEntries(
        Object.entries(source)
            .filter(([k, v]) => v != "maintain")
            .map(([k, v]) => [k, v === "unset" ? "" : v])
    )
}