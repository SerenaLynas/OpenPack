import fse from 'fs-extra';
import path from 'path';

interface Files {
    [path: string]: Buffer | string
}

export async function writeFiles(files: Files, outPath: string = '') {
    const promises = [];
    for (const [k, v] of Object.entries(files)) {
        promises.push(fse.outputFile(path.join('./assets/minecraft', outPath, k), v));
    }
    await Promise.all(promises);
}