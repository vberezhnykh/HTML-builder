import * as fs from 'fs';
import { mkdir, readdir, copyFile, writeFile } from "fs/promises";

try {
    fs.mkdir('files-copy', { recursive: true }, async (err) => {
        if (err) {
            console.log(err.message);
        } else {
            const files = await readdir('files', {withFileTypes: true});
            for (let file of files) {
                await writeFile(`./files-copy/${file.name}`, '', async (err) => {
                    if (err) console.log(err.message);
                });
                await copyFile(`./files/${file.name}`, `./files-copy/${file.name}`);
            }
        }
    }) 
} catch (err) {
    console.error(err.message);
}
