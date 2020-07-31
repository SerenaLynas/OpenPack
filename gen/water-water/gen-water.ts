import { getACanvas } from "../get-a-canvas";
import { loadImage } from "canvas";
import { writeFiles } from "../write-files";

const { canvas, ctx } = getACanvas(16, 16);
const { canvas: finalCanvas, ctx: fctx } = getACanvas(16, 512);

export async function genWater() {
    const noise = await loadImage(__dirname + '/noise.png');
    
    const totalFrames = 32;
    for (let frameNum = 0; frameNum < totalFrames; frameNum++) {
        ctx.drawImage(noise, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        const target = ((Math.sin(frameNum * 2 * Math.PI / totalFrames) + 1) / 2) * 255;
    
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                const i = (y * canvas.width + x) * 4;
                if (d[i + 3] == 0) {
                    continue;   
                }

                const range = 60;
                const val = 255 - (Math.sqrt((Math.abs(d[i] - target)) / 255) * range) - range;
                d[i] = val;
                d[i + 1] = val;
                d[i + 2] = val;
                d[i + 3] = 140;
            }
        }

        ctx.putImageData(imgData, 0, 0);

        fctx.drawImage(canvas, 0, frameNum * 16);
    }
    
    return {
        'textures/block/water_still.png': finalCanvas.toBuffer()
    }
}

(async () => {
    writeFiles(await genWater());
})();

