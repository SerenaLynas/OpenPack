import { getACanvas } from "../get-a-canvas";
import { loadImage, ImageData } from "canvas";
import { writeFiles } from "../write-files";
import { average, mod } from "../util/math";

const { canvas, ctx } = getACanvas(16, 16);
const { canvas: stillCanvas, ctx: sctx } = getACanvas(16, 512);
const { canvas: flowingCanvas, ctx: fctx } = getACanvas(32, 512);

export async function genWater(waterOpacity: number = 120 / 255) {
    const noise = await loadImage(__dirname + '/noise.png');
    
    const totalFrames = 32;
    for (let frameNum = 0; frameNum < totalFrames; frameNum++) {
    //const frameNum = 1;
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

                const range = 50;
                const val = 255 - (Math.sqrt((Math.abs(d[i] - target)) / 255) * range) - range;
                d[i] = val;
                d[i + 1] = val;
                d[i + 2] = val;
                d[i + 3] = waterOpacity * 255;
            }
        }

        ctx.putImageData(imgData, 0, 0);

        sctx.drawImage(canvas, 0, frameNum * 16);

        // Smearing for flowing water
        function getValAtPos(x: number, y: number) {
            /*if (y < 0 || y >= 16) {
                console.log({ y, fixed: mod(y, canvas.height)})
            }*/
            //console.log({x, y, fixed: mod(y, canvas.height)});
            return d[(mod(y, canvas.height) * canvas.width + mod(x, canvas.width)) * 4];
        }

        const flowImgData = new ImageData(16, 16);
        const fd = flowImgData.data;

        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                const i = (y * canvas.width + x) * 4;
                const val = average([-1, 0, 1].map(yOff => getValAtPos(x, y + yOff - frameNum)));

                fd[i] = val;
                fd[i + 1] = val;
                fd[i + 2] = val;
                fd[i + 3] = waterOpacity * 255;
            }
        }

        fctx.putImageData(flowImgData, 0, 16 * frameNum);
        fctx.putImageData(flowImgData, 16, 16 * frameNum);
    }
    
    return {
        'textures/block/water_still.png': stillCanvas.toBuffer(),
        'textures/block/water_flow.png': flowingCanvas.toBuffer()
    }
}

(async () => {
    writeFiles(await genWater());
})();