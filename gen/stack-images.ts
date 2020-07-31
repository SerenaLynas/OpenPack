import { createCanvas, Canvas, Image } from 'canvas';

const canvas = createCanvas(0, 0);
const ctx = canvas.getContext('2d');

export function stackImages(...images: (Canvas | Image)[]) {
    canvas.width = Math.max(...images.map(img => img.width));
    canvas.height = images.map(img => img.height).reduce((prev, curr) => prev + curr, 0);

    let lastY = 0;
    for (const img of images) {
        ctx.drawImage(img, 0, lastY);
        lastY += img.height;
    }

    return canvas.toBuffer();
}