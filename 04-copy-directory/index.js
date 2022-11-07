import * as fs from 'fs';
import { mkdir, readdir, copyFile, writeFile, rm } from "fs/promises";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    await rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true });
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, async (err) => {
        if (err) {
            console.log(err.message);
        } else {
            const files = await readdir(path.join(__dirname, 'files'), {withFileTypes: true});
            for (let file of files) {
                await writeFile(path.join(__dirname, `./files-copy/${file.name}`), '', async (err) => {
                    if (err) console.log(err.message);
                });
                await copyFile(path.join(__dirname, `./files/${file.name}`), path.join(__dirname, `./files-copy/${file.name}`));
            }
        }
    }) 
} catch (err) {
    console.error(err.message);
}
