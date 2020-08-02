import { colors, colorValues } from "./colors";
import { Files, writeFiles } from "../write-files";
import { getACanvas } from "../get-a-canvas";
import { loadImage } from "canvas";

const blocks = [
    `wool`,
   // `terracotta`,
   // `concrete`,
   // `concrete_powder`,
    `stained_glass`,
   // `stained_glass_pane_top`
]

const { canvas, ctx } = getACanvas();

export async function genColoredThings() {
    const outFiles: Files = {};

    for (const color of colors) {
        for (const block of blocks) {
            const [r, g, b] = colorValues[color];

            const img = await loadImage(`${__dirname}/blocks/${block}.png`);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const d = imgData.data;
            
            for (let x = 0; x < canvas.width; x++) {
                for (let y = 0; y < canvas.height; y++) {
                    const i = (y * canvas.width + x) * 4;

                    d[i] *= r / 255;
                    d[i + 1] *= g / 255;
                    d[i + 2] *= b / 255;
                }
            }

            ctx.putImageData(imgData, 0, 0);

            outFiles[`textures/block/${color}_${block}.png`] = canvas.toBuffer();
        }
    }

    return outFiles;
}

(async () => {
    writeFiles(await genColoredThings());
})();