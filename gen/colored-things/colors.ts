export const colorValues = {
    black: [8, 9, 28],
    red: [207, 62, 62],
    green: [19, 105, 20],
    brown: [92, 48, 36],
    blue: [40, 42, 122],
    purple: [92, 40, 122],
    cyan: [52, 128, 153],
    light_gray: [188, 194, 196],
    gray: [138, 138, 138],
    pink: [245, 193, 193],
    lime: [57, 219, 59],
    yellow: [255, 213, 130],
    light_blue: [130, 178, 245],
    magenta: [207, 72, 200],
    orange: [255, 159, 25],
    white: [245, 241, 240],
} as const;

export const colors: (keyof typeof colorValues)[] = Object.keys(colorValues) as any;