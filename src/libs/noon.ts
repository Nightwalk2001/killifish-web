export const noon = () => {
    const now = new Date()
    const hour = now.getHours()

    return hour < 12
        ? "morning"
        : hour < 18
            ? "afternoon"
            : "night"
}
