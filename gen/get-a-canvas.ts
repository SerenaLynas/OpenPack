import { createCanvas } from "canvas"

export function getACanvas(width: number = 0, height: number = 0) {
    const canvas = createCanvas(width, height);
    return {
        canvas,
        ctx: canvas.getContext('2d')
    }
}