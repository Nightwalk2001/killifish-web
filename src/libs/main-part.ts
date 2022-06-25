export const mainPart = (distribution: Record<string, number>) =>
    Object.entries(distribution)
          .sort((a, b) => b[1] - a[1])
        [0][0]